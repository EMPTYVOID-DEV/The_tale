import { queryWritings } from '$server/utils/databaseUtils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');
	const page = url.searchParams.get('page')!;
	const queriedWritings = await queryWritings(query, parseInt(page));
	return json(queriedWritings);
};
