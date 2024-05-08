import type { Templates } from '$global/types.global';
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
			multiTheme: true,
			tempalteName: true,
			withSearch: true
		},
		where: eq(writingTable.id, writingId)
	});
	return { template };
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
		if (file.size == 0) return fail(400, { message: "You hav'nt upload an image" });
		if (!checkType('image/*', file.type))
			return fail(400, { message: 'You should upload an image file format.' });
		if (!checkSize(1200, file.size))
			return fail(400, { message: 'Your background image size should be less than 2.5mb.' });
		const { extension, filename } = destructorFileName(file.name);
		const name = `${filename}_${writingId}.${extension}`;
		const logo = await uploadFile(file, name, 'logos');
		await db.update(writingTable).set({ logo }).where(eq(writingTable.id, writingId));
	}
};
