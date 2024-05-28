import { db } from '$server/database/database';
import { writingTable } from '$server/database/schema';
import type { ServerLoad } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: ServerLoad = async ({ params }) => {
	const { writingId } = params;
	const data = await db.query.writingTable.findFirst({
		where: eq(writingTable.id, writingId),
		columns: {
			colors: true,
			fonts: true,
			rootSection: true
		}
	});
	return { ...data };
};
