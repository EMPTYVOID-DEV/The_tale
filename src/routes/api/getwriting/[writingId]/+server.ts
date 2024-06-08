import { db } from '$server/database/database';
import { and, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { writingTable } from '$server/database/schema';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	const { writingId } = params;
	const { id } = locals.user;
	const writing = await db.query.writingTable.findFirst({
		where: and(eq(writingTable.id, writingId), eq(writingTable.ownerId, id))
	});
	return json(writing);
};
