import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
	const isAuthenticated = locals.user != null;

	return {
		isAuthenticated
	};
};
