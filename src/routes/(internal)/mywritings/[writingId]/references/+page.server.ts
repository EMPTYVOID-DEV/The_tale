import { getValidator, hrefSchema, referenceTitleSchema } from '$global/zod';
import { db } from '$server/database/database';
import { writingReferencesTable } from '$server/database/schema';
import type { Actions, Load } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').PageServerLoad} */
export const load: Load = async ({ params }) => {
	const writingId = params.writingId;
	const references = await db.query.writingReferencesTable.findMany({
		columns: { writingId: false },
		where: eq(writingReferencesTable.writingId, writingId)
	});
	return {
		references
	};
};

export const actions: Actions = {
	addReference: async ({ params, request, locals }) => {
		const writingId = params.writingId;
		const writerId = locals.user.id;
		const fd = await request.formData();
		const title = fd.get('title').toString();
		const href = fd.get('href').toString();
		const description = fd.get('description').toString();
		const validateHref = getValidator(hrefSchema);
		const validateTitle = getValidator(referenceTitleSchema);

		if (validateTitle(title).state == 'invalid')
			return fail(403, { message: validateTitle(title).errorMsg });
		if (validateHref(href).state == 'invalid')
			return fail(403, { message: validateHref(href).errorMsg });
		try {
			await db
				.insert(writingReferencesTable)
				.values({ writingId, description, title, href, writerId });
		} catch (error) {
			if (error.code === '23505')
				return fail(409, { message: 'It seems the reference already exists.' });
		}
	},
	removeReference: async () => {}
};
