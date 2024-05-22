import { getAuthorInfo } from '$server/utils/databaseUtils';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	const { authorId } = params;
	const info = await getAuthorInfo(authorId);
	return info;
};
