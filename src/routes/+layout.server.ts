import { createCsrfToken } from '$server/utils/csrfToken';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
	const isAuthenticated = locals.user != null;
	let csrfToken = '';
	let avatar = null;

	if (isAuthenticated) {
		avatar = locals.user.avatar;
		if (url.pathname.startsWith('/dashboard')) {
			csrfToken = createCsrfToken(locals.user.id);
		}
	}

	return {
		avatar,
		isAuthenticated,
		csrfToken
	};
};
