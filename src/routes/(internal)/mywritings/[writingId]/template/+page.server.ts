import type { Templates, WritingColors } from '$global/types.global';
import { checkType, checkSize, destructorFileName } from '$global/utils.global';
import { db } from '$server/database/database';
import { writingTable } from '$server/database/schema';
import { uploadFile } from '$server/utils/uploadFile';
import { fail, type Actions, type Load } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: Load = async ({ params }) => {
	const writingId = params.writingId;
	const template = await db.query.writingTable.findFirst({
		columns: {
			colors: true,
			fonts: true,
			logo: true,
			tempalteName: true
		},
		where: eq(writingTable.id, writingId)
	});
	return { ...template };
};

export const actions: Actions = {
	changeTemplate: async ({ request, params }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const tempalteName = fd.get('template').toString() as Templates;
		await db
			.update(writingTable)
			.set({ tempalteName: tempalteName })
			.where(eq(writingTable.id, writingId));
	},
	changeLogo: async ({ request, params }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const file = fd.get('file') as File;
		if (file.size == 0) return fail(400, { message: "You hav'nt upload an svg" });
		if (!checkType('image/svg+xml', file.type))
			return fail(400, { message: 'You should upload an svg file format.' });
		if (!checkSize(1200, file.size))
			return fail(400, { message: 'Your logo svg size should be less than 2.5mb.' });
		const { extension, filename } = destructorFileName(file.name);
		const name = `${filename}_${writingId}.${extension}`;
		const logo = await uploadFile(file, name, 'logos');
		await db.update(writingTable).set({ logo }).where(eq(writingTable.id, writingId));
	},
	changeFonts: async ({ params, request }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const body = fd.get('body').toString();
		const heading = fd.get('heading').toString();
		await db
			.update(writingTable)
			.set({
				fonts: { body, heading }
			})
			.where(eq(writingTable.id, writingId));
	},
	changeColors: async ({ params, request }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const colorsString = fd.get('colors').toString();
		const colors = JSON.parse(colorsString) as WritingColors;
		await db.update(writingTable).set({ colors }).where(eq(writingTable.id, writingId));
	}
};
