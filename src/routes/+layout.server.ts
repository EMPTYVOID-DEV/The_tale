import { createCsrfToken } from '$server/utils/csrfToken';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
	const isAuthenticated = locals.user != null;
	let csrfToken = '';
	let username = '';
	let avatar = null;

	if (isAuthenticated) {
		avatar = locals.user.avatar;
		username = locals.user.username;
		if (url.pathname.startsWith('/profile')) {
			csrfToken = createCsrfToken(locals.user.id);
		}
	}

	return {
		avatar,
		isAuthenticated,
		csrfToken,
		username
	};
};
