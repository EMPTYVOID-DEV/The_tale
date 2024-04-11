import { MAIL_KEY, API_EMAIL } from '$env/static/private';
import type { mailOptions } from '$server/types.server';
import { createTransport } from 'nodemailer';
import { render } from 'svelte-email';
import type { ComponentType, SvelteComponent } from 'svelte';

export async function sendVerificationEmail(
	email: string,
	code: string,
	template: ComponentType<SvelteComponent>
) {
	const transport = createTransport({
		host: 'smtp-relay.brevo.com',
		port: 587,
		auth: {
			user: API_EMAIL,
			pass: MAIL_KEY
		}
	});
	const emailHtml = render({
		template,
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
