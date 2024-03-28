import { db } from '$server/database/database';
import { keyTable } from '$server/database/schema';
import { createSession } from '$server/utils/authUtils';
import { insertUser } from '$server/utils/databaseUtils';
import type { key, user } from '$server/types.server';
import { validateEmail, validatePassword, validateUsername } from '$global/zod/authSchema';
import { error, type Actions, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

export const actions: Actions = {
	'sign up': async ({ request }) => {
		const fd = await request.formData();
		const username = fd.get('username').toString();
		const email = fd.get('email').toString();
		const password = fd.get('password').toString();
		if (validateUsername(username).state == 'invalid') return validateUsername(username).errorMsg;
		if (validateEmail(email).state == 'invalid') return validateEmail(email).errorMsg;
		if (validatePassword(password).state == 'invalid') return validatePassword(password).errorMsg;
		try {
			const id = generateId(12);
			const hashedPassword = await new Argon2id().hash(password);
			const newUser: user = {
				id,
				username
			};
			const key: key = {
				provider_name: 'email',
				provider_id: email,
				userId: id,
				secret: hashedPassword,
				verified: 0
			};
			await insertUser(newUser, key);
		} catch (err) {
			if (err.code === 'SQLITE_CONSTRAINT_UNIQUE')
				return 'It seems that this account already exist';
			error(500, 'Service unavailable');
		}
		redirect(302, '/auth/emailVerification');
	},
	'sign in': async ({ cookies, request }) => {
		const fd = await request.formData();
		const email = fd.get('email').toString();
		const password = fd.get('password').toString();
		if (validateEmail(email).state == 'invalid') return validateEmail(email).errorMsg;
		if (validatePassword(password).state == 'invalid') return validatePassword(password).errorMsg;
		const keyExist = await db.query.keyTable
			.findFirst({
				where: and(eq(keyTable.provider_name, 'email'), eq(keyTable.provider_id, email))
			})
			.catch(() => error(500, 'Service unavailable'));
		if (!keyExist) return 'It seems the user does not exist.';
		const isValid = await new Argon2id().verify(keyExist.secret, password);
		if (!isValid) return 'Your password is not correct';
		if (keyExist.verified == 1) {
			await createSession(
				cookies,
				{
					httpOnly: true,
					path: '/'
				},
				keyExist.userId
			).catch(() => error(500, 'Service unavailable'));
			redirect(302, '/dashboard');
		}
		redirect(302, 'auth/emailVerification');
	}
};
