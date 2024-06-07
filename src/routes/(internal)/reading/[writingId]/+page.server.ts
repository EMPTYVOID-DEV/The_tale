import { error, type ServerLoad } from '@sveltejs/kit';
import { getWritingInfo } from '$server/utils/databaseUtils';

export const load: ServerLoad = async ({ params }) => {
	const { writingId } = params;

	const writingInfo = await getWritingInfo(writingId);

	if (!writingInfo.info) error(404);
	if (writingInfo.info.private) error(403);
	return writingInfo;
};
