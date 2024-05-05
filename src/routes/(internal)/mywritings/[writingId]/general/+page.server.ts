import { error, fail, type Actions, type Load } from '@sveltejs/kit';
import { db } from '$server/database/database';
import { eq } from 'drizzle-orm';
import { writingTable } from '$server/database/schema';
import { validateWritingName } from '$global/zod';

export const load: Load = async ({ params }) => {
	const writingId = params.writingId;
	try {
		const writingSettings = await db.query.writingTable.findFirst({
			where: eq(writingTable.id, writingId),
			columns: {
				name: true,
				description: true,
				banner: true
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
	}
};
