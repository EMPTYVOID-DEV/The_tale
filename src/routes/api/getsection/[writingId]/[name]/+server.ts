import { db } from '$server/database/database';
import { and, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { sectionsTable, writingTable } from '$server/database/schema';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const { name, writingId } = params;
	const { id } = locals.user;
	const writingPromise = db.query.writingTable.findFirst({
		where: and(eq(writingTable.id, writingId), eq(writingTable.ownerId, id))
	});
	const sectionPromise = db.query.sectionsTable.findFirst({
		where: and(eq(sectionsTable.name, name), eq(sectionsTable.writingId, writingId))
	});

	const results = await Promise.allSettled([writingPromise, sectionPromise]);

	if (results[0].status == 'rejected' || results[1].status == 'rejected')
		throw new Error('service unavailable');

	if (results[0].value) {
		return json(results[1].value);
	}
	return new Response('Not found', { status: 404 });
};
