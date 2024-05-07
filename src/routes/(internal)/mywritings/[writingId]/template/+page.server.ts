import { db } from '$server/database/database';
import { writingTable } from '$server/database/schema';
import type { Load } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: Load = async ({ params }) => {
	const writingId = params.writingId;
	const template = await db.query.writingTable.findFirst({
		columns: {
			colors: true,
			fonts: true,
			logo: true,
			multiTheme: true,
			tempalteName: true,
			withSearch: true
		},
		where: eq(writingTable.id, writingId)
	});
	return { template };
};
