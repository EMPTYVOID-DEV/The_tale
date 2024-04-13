import { createCsrfToken } from '$server/utils/csrfToken';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
	const isAuthenticated = locals.user != null;
	if (!isAuthenticated) return { isAuthenticated };
	if (isAuthenticated) {
		const avatar = locals.user.avatar;
		const username = locals.user.username;
		let csrfToken = '';
		if (url.pathname.startsWith('/account')) {
			csrfToken = createCsrfToken(locals.user.id);
		}
		return {
			isAuthenticated,
			avatar,
			csrfToken,
			username
		};
	}
};
