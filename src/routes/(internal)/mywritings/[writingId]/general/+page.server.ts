import { fail, redirect, type Actions, type Load } from '@sveltejs/kit';
import { db } from '$server/database/database';
import { eq } from 'drizzle-orm';
import { writingTable } from '$server/database/schema';
import { getValidator, descriptionSchema, writingNameSchema } from '$global/zod';
import { uploadFile } from '$server/utils/uploadFile';
import { checkSize, checkType, destructorFileName } from '$global/utils.global';

export const load: Load = async ({ params }) => {
	const writingId = params.writingId;
	const writingSettings = await db.query.writingTable.findFirst({
		where: eq(writingTable.id, writingId),
		columns: {
			name: true,
			description: true,
			background: true
		}
	});
	return { settings: writingSettings };
};

export const actions: Actions = {
	changeName: async ({ request, params }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const name = fd.get('name').toString();
		const validateWritingName = getValidator(writingNameSchema);
		if (validateWritingName(name).state == 'invalid')
			return fail(400, { message: validateWritingName(name).errorMsg });
		await db.update(writingTable).set({ name }).where(eq(writingTable.id, writingId));
	},
	changeDescription: async ({ request, params }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const description = fd.get('description').toString();
		const validateWritingDescription = getValidator(descriptionSchema);
		if (validateWritingDescription(description).state == 'invalid')
			return fail(400, { message: validateWritingDescription(description).errorMsg });
		await db.update(writingTable).set({ description }).where(eq(writingTable.id, writingId));
	},
	changeBackground: async ({ params, request }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const file = fd.get('file') as File;
		if (file.size == 0) return fail(400, { message: 'You should upload an image.' });
		if (!checkType('image/*', file.type))
			return fail(400, { message: 'You should upload an image file format.' });
		if (!checkSize(2500, file.size))
			return fail(400, { message: 'Your background image size should be less than 2.5mb.' });
		const { extension, filename } = destructorFileName(file.name);
		const name = `${filename}_${writingId}.${extension}`;
		const value = await uploadFile(file, name, 'backgrounds');
		await db.update(writingTable).set({ background: value }).where(eq(writingTable.id, writingId));
	},
	deleteWriting: async ({ params, request }) => {
		const fd = await request.formData();
		const writingId = params.writingId;
		const confirmation = fd.get('confirmation').toString();
		if (confirmation != writingId)
			return fail(400, { message: 'The confirmation text is not valid' });
		await db.delete(writingTable).where(eq(writingTable.id, writingId));
		redirect(303, '/mywritings');
	}
};
