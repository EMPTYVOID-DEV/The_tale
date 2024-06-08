import { getAuthorInfo } from '$server/utils/databaseUtils';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	const { writerId } = params;
	const info = await getAuthorInfo(writerId);
	if (!info) error(404);
	return info;
};
