import { db } from '$server/database/database';
import { sectionsTable } from '$server/database/schema';
import { error, type ServerLoad } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load: ServerLoad = async ({ params }) => {
	const { name, writingId } = params;
	const sectionData = await db.query.sectionsTable.findFirst({
		where: and(eq(sectionsTable.name, name), eq(sectionsTable.writingId, writingId)),
		columns: {
			content: true
		}
	});

	if (!sectionData) error(404);

	return { ...sectionData };
};
