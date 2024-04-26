import { getMyContributions } from '$server/utils/databaseUtils';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
	const userId = locals.user.id;
	const contributions = await getMyContributions(userId);
	return {
		contributions
	};
};
