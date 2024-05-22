import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
	const isAuthenticated = locals.user != null;
	if (url.pathname && !isAuthenticated) return { isAuthenticated };
	if (isAuthenticated) {
		return {
			isAuthenticated,
			avatar: locals.user.avatar,
			username: locals.user.username,
			id: locals.user.id,
			about: locals.user.about
		};
	}
};
