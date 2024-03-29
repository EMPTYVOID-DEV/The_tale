import { MAIL_KEY, API_EMAIL } from '$env/static/private';
import type { mailOptions } from '$server/types.server';
import { createTransport } from 'nodemailer';
import { render } from 'svelte-email';
import Template from '$components/other/emailVerifyTemplate.svelte';

export async function sendVerificationEmail(email: string, code: string) {
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
		},
		options: {
			pretty: true
		}
	});
	const mailOptions: mailOptions = {
		from: API_EMAIL,
		subject: 'Email verification',
		to: email,
		html: emailHtml
	};
	return transport.sendMail(mailOptions);
}
2;
