import { dev } from '$app/environment';
import { validateEmail, validatePassword } from '$global/zod';
import { sendVerificationEmail } from '$lib/server/auth/email';
import { db } from '$server/database/database';
import { keyTable } from '$server/database/schema';
import { fail, type Actions, error, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import template from '../components/emailPasswordTemplate.svelte';
import otpGen from 'otp-generator';
import { Argon2id } from 'oslo/password';

export const actions: Actions = {
	send: async ({ request, cookies }) => {
		const fd = await request.formData();
		const email = fd.get('email').toString();
		if (validateEmail(email).state == 'invalid')
			return fail(403, { message: validateEmail(email).errorMsg });

		const user = await db.query.keyTable
			.findFirst({
				where: and(eq(keyTable.provider_name, 'email'), eq(keyTable.provider_id, email))
			})
			.catch(() => error(500, 'Service unavailable'));
		if (!user) return fail(403, { message: 'This email is not attached to an account.' });

		const otp = otpGen.generate(6, {
			lowerCaseAlphabets: false,
			specialChars: false,
			upperCaseAlphabets: false
		});
		try {
			await sendVerificationEmail(email, otp, template);
			cookies.set('otp', otp, {
				path: '/auth/password-reset',
				httpOnly: true,
				maxAge: 60 * 10,
				secure: !dev
			});
		} catch (error) {
			return fail(400, { message: 'Failed to send you an email' });
		}
	},
	verify: async ({ cookies, request }) => {
		const fd = await request.formData();
		const enteredOtp = fd.get('otp');
		const validOtp = cookies.get('otp');
		if (!validOtp) return fail(400, { message: 'The code has expired, try resend.' });
		// you can clear the cookie here
		if (enteredOtp != validOtp) return fail(403, { message: 'The entered code is not valid.' });
	},
	reset: async ({ request }) => {
		const fd = await request.formData();
		const password = fd.get('password').toString();
		const email = fd.get('email').toString();
		if (validatePassword(password).state == 'invalid')
			return fail(403, { message: validatePassword(password).errorMsg });
		const hashedPassword = await new Argon2id().hash(password);
		await db
			.update(keyTable)
			.set({ verified: true, secret: hashedPassword })
			.where(and(eq(keyTable.provider_name, 'email'), eq(keyTable.provider_id, email)))
			.catch(() => error(500, 'Service unavailable'));
		redirect(302, '/auth');
	}
};
