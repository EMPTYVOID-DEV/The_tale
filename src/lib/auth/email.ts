import { MAIL_KEY, API_EMAIL } from '$env/static/private';
import type { mailOptions } from '$schema/types/server.types';
import { createTransport } from 'nodemailer';
import { render } from 'svelte-email';
import Template from '$lib/ui/components/other/emailVerifyTemplate.svelte';

export async function sendVerificationEmail(email: string, code: number, subject: string) {
	const transport = createTransport({
		host: 'smtp-relay.brevo.com',
		port: 587,
		auth: {
			user: API_EMAIL,
			pass: MAIL_KEY
		}
	});
	const emailHtml = render({
		template: Template,
		props: {
			code
		}
	});
	const mailOptions: mailOptions = {
		from: API_EMAIL,
		subject: subject,
		to: email,
		html: emailHtml
	};
	return transport.sendMail(mailOptions);
}
2;
