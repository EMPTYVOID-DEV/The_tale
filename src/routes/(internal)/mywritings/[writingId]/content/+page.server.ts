import { getWritingContent } from '$server/utils/databaseUtils';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	const writingId = params.writingId;
	const content = await getWritingContent(writingId);
	console.log(content);
	return {
		content
	};
};
