import { getAuthorInfo } from '$server/utils/databaseUtils';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	const { writerId } = params;
	const info = await getAuthorInfo(writerId);
	return info;
};
