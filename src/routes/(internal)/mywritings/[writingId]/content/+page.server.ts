import { db } from '$server/database/database';
import { writingTable } from '$server/database/schema';
import { addRootSection } from '$server/utils/databaseUtils';
import type { Actions, ServerLoad } from '@sveltejs/kit';
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

export const actions: Actions = {
	addRoot: async ({ request, params, locals }) => {
		const userId = locals.user.id;
		const writingId = params.writingId;
		const fd = await request.formData();
		const root = fd.get('root').toString();
		await addRootSection(root, writingId, userId);
	}
};
