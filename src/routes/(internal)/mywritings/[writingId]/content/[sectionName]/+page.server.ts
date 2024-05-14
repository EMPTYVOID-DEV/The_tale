import { db } from '$server/database/database';
import { sectionsTable } from '$server/database/schema';
import { removeSection } from '$server/utils/databaseUtils';
import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

/**
 * TODO: update delete action where it does not delete when there is one section
 * TODO: update delete action where we adjust the root column in the writing
 * TODO: add the add-sibling/child action
 * TODO: add save changes action for name and content change
 */

export const load: ServerLoad = async ({ params }) => {
	const { writingId, sectionName } = params;
	const sectionData = await db.query.sectionsTable.findFirst({
		where: and(eq(sectionsTable.writingId, writingId), eq(sectionsTable.name, sectionName))
	});
	if (!sectionData) redirect(302, `/mywritings/${writingId}/content`);
	return {
		sectionData
	};
};

export const actions: Actions = {
	delete: async ({ params, locals }) => {
		const userId = locals.user.id;
		const { writingId, sectionName } = params;
		await removeSection(sectionName, userId, writingId);
		redirect(303, `/mywritings/${writingId}/content`);
	}
};
