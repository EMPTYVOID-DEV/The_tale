import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
	let isAuthenticated = false;
	if (url.pathname) isAuthenticated = locals.user != null;
	return {
		isAuthenticated
	};
};
