import { getValidator, sectionNameSchema } from '$global/zod';
import { db } from '$server/database/database';
import { writingTable } from '$server/database/schema';
import { addRootSection } from '$server/utils/databaseUtils';
import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
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
		const validateName = getValidator(sectionNameSchema);
		const root = fd.get('root').toString().toLowerCase();
		if (validateName(root).state == 'invalid')
			return fail(400, { message: validateName(root).errorMsg });
		await addRootSection(root, writingId, userId);
	}
};
