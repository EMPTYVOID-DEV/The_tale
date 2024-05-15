import { db } from '$server/database/database';
import { sectionsTable } from '$server/database/schema';
import { updateSection } from '$server/utils/databaseUtils';
import { uploadFile } from '$server/utils/uploadFile';
import type { dataBlock } from '@altron/altron/types';
import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

/**
 * TODO: update delete action where it does not delete when there is one section
 * TODO: update delete action where we adjust the root column in the writing
 * TODO: add the add-sibling/child action
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
	save: async ({ request, locals, params }) => {
		const { id } = locals.user;
		const { writingId, sectionName } = params;
		const fd = await request.formData();
		const files = fd.getAll('files') as File[];
		const content = JSON.parse(fd.get('content').toString()) as dataBlock[];
		const filesUploads = files.map((file) => uploadFile(file, file.name, 'sections'));
		const results = await Promise.allSettled(filesUploads);
		for (const result of results)
			if (result.status == 'rejected') return fail(500, { message: 'Failed to save files' });
		await updateSection(content, sectionName, id, writingId);
	}
};
