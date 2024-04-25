import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
	const isAuthenticated = locals.user != null;
	if (!isAuthenticated) return { isAuthenticated };
	if (isAuthenticated) {	
		return {
			isAuthenticated,
			avatar: locals.user.avatar,
			username: locals.user.username,
			id: locals.user.id,
		};
	}
};
