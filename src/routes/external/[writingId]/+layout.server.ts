import { db } from '$server/database/database';
import { writingTable } from '$server/database/schema';
import { error, type ServerLoad } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: ServerLoad = async ({ params }) => {
	const { writingId } = params;
	const data = await db.query.writingTable.findFirst({
		where: eq(writingTable.id, writingId),
		columns: {
			colors: true,
			fonts: true,
			rootSection: true,
			private: true
		}
	});
	if (!data) error(404);
	if (data.private) error(403);
	return { ...data };
};
