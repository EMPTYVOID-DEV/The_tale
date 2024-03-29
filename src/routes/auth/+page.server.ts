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
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	'sign up': async ({ request }) => {
		const fd = await request.formData();
		const username = fd.get('username').toString();
		const email = fd.get('email').toString();
		const password = fd.get('password').toString();
		if (validateUsername(username).state == 'invalid')
			return fail(403, { message: validateUsername(username).errorMsg });
		if (validateEmail(email).state == 'invalid')
			return fail(403, { message: validateEmail(email).errorMsg });
		if (validatePassword(password).state == 'invalid')
			return fail(403, { message: validatePassword(password).errorMsg });
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
		try {
			await insertUser(newUser, key);
		} catch (error) {
			if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY')
				return fail(409, { message: 'It seems that this account already exist.' });
			error(500, 'Service unavailable');
		}
		redirect(302, `/auth/emailVerification/${email}`);
	},
	'sign in': async ({ cookies, request }) => {
		const fd = await request.formData();
		const email = fd.get('email').toString();
		const password = fd.get('password').toString();
		if (validateEmail(email).state == 'invalid')
			return fail(403, { message: validateEmail(email).errorMsg });
		if (validatePassword(password).state == 'invalid')
			return fail(403, { message: validatePassword(password).errorMsg });
		const userKey = await db.query.keyTable
			.findFirst({
				where: and(eq(keyTable.provider_name, 'email'), eq(keyTable.provider_id, email))
			})
			.catch(() => error(500, 'Service unavailable'));
		if (!userKey) return fail(404, { message: 'It seems the user does not exist.' });
		const isValid = await new Argon2id().verify(userKey.secret, password);
		if (!isValid) return fail(403, { message: 'The password is not correct.' });
		if (userKey.verified == 1) {
			await createSession(
				cookies,
				{
					httpOnly: true,
					path: '/'
				},
				userKey.userId
			).catch(() => error(500, 'Service unavailable'));
			redirect(302, '/dashboard');
		}
		redirect(302, `/auth/emailVerification/${email}`);
	}
};
