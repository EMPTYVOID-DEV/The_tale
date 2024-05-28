import { db } from '$server/database/database';
import { sectionsTable } from '$server/database/schema';
import type { ServerLoad } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load: ServerLoad = async ({ params }) => {
	const { sectionName, writingId } = params;
	const sectionData = await db.query.sectionsTable.findFirst({
		where: and(eq(sectionsTable.name, sectionName), eq(sectionsTable.writingId, writingId)),
		columns: {
			content: true
		}
	});

	return { ...sectionData };
};
