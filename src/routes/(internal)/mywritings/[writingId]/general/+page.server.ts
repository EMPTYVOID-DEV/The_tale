import { error, fail, redirect, type Actions, type Load } from '@sveltejs/kit';
import { db } from '$server/database/database';
import { eq } from 'drizzle-orm';
import { writingTable } from '$server/database/schema';
import { validateWritingDescription, validateWritingName } from '$global/zod';
import { uploadFile } from '$server/utils/uploadFile';
import { destructorFileName } from '$global/utils.global';

export const load: Load = async ({ params }) => {
	const writingId = params.writingId;
	try {
		const writingSettings = await db.query.writingTable.findFirst({
			where: eq(writingTable.id, writingId),
			columns: {
				name: true,
				description: true,
				background: true
			}
		});
		return { settings: writingSettings };
	} catch (err) {
		error(500, 'Service Unavailable');
	}
};

export const actions: Actions = {
	changeName: async ({ request, params }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const name = fd.get('name').toString();
		if (validateWritingName(name).state == 'invalid')
			return fail(400, { message: validateWritingName(name).errorMsg });
		try {
			await db.update(writingTable).set({ name }).where(eq(writingTable.id, writingId));
		} catch (err) {
			error(500, 'Service unavailable');
		}
	},
	changeDescription: async ({ request, params }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const description = fd.get('description').toString();
		if (validateWritingDescription(description).state == 'invalid')
			return fail(400, { message: validateWritingDescription(description).errorMsg });
		try {
			await db.update(writingTable).set({ description }).where(eq(writingTable.id, writingId));
		} catch (err) {
			error(500, 'Service unavailable');
		}
	},
	changeBackground: async ({ params, request }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const type = fd.get('type').toString() as 'url' | 'color';
		const color = fd.get('color').toString();
		const file = fd.get('file') as File;
		try {
			let value = color;
			if (type == 'url') {
				const { extension, filename } = destructorFileName(file.name);
				const name = `${filename}_${writingId}.${extension}`;
				value = await uploadFile(file, name, 'backgrounds');
			}
			await db.update(writingTable).set({ background: { value, type } });
		} catch (err) {
			error(500, 'Service unavailable');
		}
	},
	deleteWriting: async ({ params, request }) => {
		const fd = await request.formData();
		const writingId = params.writingId;
		const confirmation = fd.get('confirmation').toString();
		if (confirmation != writingId)
			return fail(400, { message: 'The confirmation text is not valid' });
		try {
			await db.delete(writingTable).where(eq(writingTable.id, writingId));
		} catch (error) {
			error(500, 'Service unavailable');
		}
		redirect(303, '/mywritings');
	}
};
