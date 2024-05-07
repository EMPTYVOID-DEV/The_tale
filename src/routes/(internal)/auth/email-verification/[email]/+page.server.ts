import { dev } from '$app/environment';
import { sendVerificationEmail } from '$lib/server/auth/email';
import { db } from '$server/database/database';
import { keyTable } from '$server/database/schema';
import { createSession } from '$server/utils/authUtils';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import template from '../../components/emailVerifyTemplate.svelte';
import { and, eq } from 'drizzle-orm';
import otpGen from 'otp-generator';

export const actions: Actions = {
	send: async ({ params, cookies }) => {
		const email = params.email;
		const otp = otpGen.generate(6, {
			lowerCaseAlphabets: false,
			specialChars: false,
			upperCaseAlphabets: false
		});
		await sendVerificationEmail(email, otp, template);
		cookies.set('otp', otp, {
			path: '/auth/email-verification',
			httpOnly: true,
			maxAge: 60 * 10,
			secure: !dev
		});
	},
	verify: async ({ cookies, request, params }) => {
		const email = params.email;
		const fd = await request.formData();
		const enteredOtp = fd.get('otp');
		const validOtp = cookies.get('otp');
		if (!validOtp) return fail(400, { message: 'The code has expired, try resend.' });
		// you can clear the cookie here
		if (enteredOtp != validOtp) return fail(403, { message: 'The entered code is not valid' });
		const userKey = (
			await db
				.update(keyTable)
				.set({ verified: true })
				.where(and(eq(keyTable.provider_name, 'email'), eq(keyTable.provider_id, email)))
				.returning({ userId: keyTable.userId })
		)[0];
		await createSession(cookies, userKey.userId);
		redirect(302, '/mywritings');
	}
};
