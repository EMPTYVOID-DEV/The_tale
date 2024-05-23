import { getValidator, sectionNameSchema } from '$global/zod';
import { db } from '$server/database/database';
import { sectionsTable } from '$server/database/schema';
import { addSection, deleteSection, updateSection } from '$server/utils/databaseUtils';
import { uploadFile } from '$server/utils/uploadFile';
import type { dataBlock } from '@altron/altron/types';
import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

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
		const name = fd.get('name').toString();
		const filesUploads = files.map((file) => uploadFile(file, file.name, 'sections'));
		const results = await Promise.allSettled(filesUploads);
		const validateName = getValidator(sectionNameSchema);
		if (validateName(name).state == 'invalid')
			return fail(400, { message: validateName(name).errorMsg });
		for (const result of results)
			if (result.status == 'rejected') return fail(500, { message: 'Failed to save files' });
		const status = await updateSection(content, sectionName, id, writingId, name);
		if (status == 'duplicate')
			return fail(422, { message: 'Another section with same name was found' });
		if (status == 'not found')
			return fail(401, {
				message: 'It seems someone has deleted the section while you are working'
			});
	},
	addSibling: async ({ request, params, locals }) => {
		const { id } = locals.user;
		const { writingId, sectionName } = params;
		const fd = await request.formData();
		const sibling = fd.get('sibling').toString();
		const validateName = getValidator(sectionNameSchema);
		if (validateName(sibling).state == 'invalid')
			return fail(400, { message: validateName(sibling).errorMsg });
		const status = await addSection('sibling', sectionName, sibling, id, writingId);
		if (status == 'duplicate')
			return fail(422, { message: 'Another section with same name was found' });
		if (status == 'not found')
			return fail(401, {
				message: 'It seems someone has deleted the section while you are working'
			});
		if (status == 'max depth')
			return fail(401, {
				message: 'The writing content tree has reached maximum depth 3.'
			});
		redirect(302, `/mywritings/${writingId}/content`);
	},
	addChild: async ({ request, params, locals }) => {
		const { id } = locals.user;
		const { writingId, sectionName } = params;
		const fd = await request.formData();
		const child = fd.get('child').toString();
		const validateName = getValidator(sectionNameSchema);
		if (validateName(child).state == 'invalid')
			return fail(400, { message: validateName(child).errorMsg });
		const status = await addSection('child', sectionName, child, id, writingId);
		if (status == 'duplicate')
			return fail(422, { message: 'Another section with same name was found' });
		if (status == 'not found')
			return fail(401, {
				message: 'It seems someone has deleted the section while you are working'
			});
		if (status == 'max depth')
			return fail(401, {
				message: 'The writing content tree has reached maximum depth 3.'
			});
		redirect(302, `/mywritings/${writingId}/content`);
	},
	delete: async ({ params, locals }) => {
		const { id } = locals.user;
		const { writingId, sectionName } = params;
		await deleteSection(sectionName, id, writingId);
		redirect(302, `/mywritings/${writingId}/content`);
	}
};
