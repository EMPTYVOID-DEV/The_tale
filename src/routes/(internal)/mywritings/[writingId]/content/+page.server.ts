import { db } from '$server/database/database';
import { writingTable } from '$server/database/schema';
import type { ServerLoad } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: ServerLoad = async ({ params }) => {
	const writingId = params.writingId;
	const content = await db.query.writingTable.findFirst({
		where: eq(writingTable.id, writingId),
		columns: { rootSection: true }
	});
	return {
		rootSection: content.rootSection
	};
};
