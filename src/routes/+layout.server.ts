import { createCsrfToken } from '$server/utils/csrfToken';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
	const isAuthenticated = locals.user != null;
	let csrfToken = '';

	if (url.pathname.startsWith('/dashboard') && isAuthenticated) {
		csrfToken = createCsrfToken(locals.user.id);
	}

	return {
		isAuthenticated,
		csrfToken
	};
};
