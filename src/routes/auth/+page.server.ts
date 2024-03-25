import { db } from '$lib/database/database';
import { userTable } from '$lib/database/schema';
import { createSession } from '$lib/utils/authUtils';
import { validateEmail, validatePassword } from '$schema/zod/authSchema';
import { error, type Actions, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

export const actions: Actions = {
	'sign up': async ({ request, cookies }) => {
		const fd = await request.formData();
		const username = fd.get('username').toString();
		const email = fd.get('email').toString();
		const password = fd.get('password').toString();
		const isValidEmail = validateEmail(email);
		const isValidPassword = validatePassword(password);
		if (isValidEmail.state == 'invalid') return isValidEmail.errorMsg;
		if (isValidPassword.state == 'invalid') return isValidPassword.errorMsg;
		try {
			const userId = generateId(12);
			const hashedPassword = await new Argon2id().hash(password);
			await db.insert(userTable).values({
				username,
				hashedPassword,
				email,
				id: userId
			});
			await createSession(
				cookies,
				{
					httpOnly: true,
					path: '/'
				},
				userId
			);
		} catch (err) {
			if (err.code === 'SQLITE_CONSTRAINT_UNIQUE')
				return 'It seems that this account already exist';
			error(500, 'Service unavailable');
		}
		redirect(302, '/');
	},
	'sign in': async ({ cookies, request }) => {
		const fd = await request.formData();
		const email = fd.get('email').toString();
		const password = fd.get('password').toString();
		const isValidEmail = validateEmail(email);
		const isValidPassword = validatePassword(password);
		if (isValidEmail.state == 'invalid') return isValidEmail.errorMsg;
		if (isValidPassword.state == 'invalid') return isValidPassword.errorMsg;
		try {
			const existingUser = await db.query.userTable.findFirst({
				where: eq(userTable.email, email)
			});
			// here the user may have an account but it was created through github auth
			if (!existingUser || !existingUser.hashedPassword) return 'It seems the user does not exist.';
			const isValid = await new Argon2id().verify(existingUser.hashedPassword, password);
			if (!isValid) return 'Your password is not correct';
			await createSession(
				cookies,
				{
					httpOnly: true,
					path: '/'
				},
				existingUser.id
			);
		} catch (err) {
			error(500, 'Service unavailable');
		}
		redirect(302, '/');
	}
};
