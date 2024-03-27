import { sendVerificationEmail } from '$lib/auth/email';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async () => {
		try {
			await sendVerificationEmail('keskasaymen8@gmail.com', 30002, 'testing');
			console.log('sent');
		} catch (error) {
			console.log(error);
		}
	}
};
