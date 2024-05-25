import type { WritingColors } from '$global/types.global';
import { db } from '$server/database/database';
import { writingTable } from '$server/database/schema';
import { type Actions, type Load } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: Load = async ({ params }) => {
	const writingId = params.writingId;
	const template = await db.query.writingTable.findFirst({
		columns: {
			colors: true,
			fonts: true
		},
		where: eq(writingTable.id, writingId)
	});
	return { ...template };
};

export const actions: Actions = {
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
