import { db } from '$server/database/database';
import { writingTable } from '$server/database/schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { and, arrayContains, eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals, url }) => {
	const { id } = locals.user;
	const tags = url.searchParams.getAll('tags');
	const query =
		tags.length == 0
			? eq(writingTable.ownerId, id)
			: and(eq(writingTable.ownerId, id), arrayContains(writingTable.tags, tags));
	const writings = await db.query.writingTable.findMany({
		where: query
	});
	return json(writings);
};
