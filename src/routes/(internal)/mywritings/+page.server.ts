import { fail, redirect, type Actions } from '@sveltejs/kit';
import { getValidator, writingNameSchema } from '$global/zod';
import { addWriting } from '$server/utils/databaseUtils';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const userId = locals.user.id;
		const fd = await request.formData();
		const writingName = fd.get('writingName')?.toString();
		const validateWritingName = getValidator(writingNameSchema);
		if (validateWritingName(writingName).state == 'invalid')
			return fail(403, { message: validateWritingName(writingName).errorMsg });
		const writingId = await addWriting(userId, writingName);
		redirect(302, `/mywritings/${writingId}/content`);
	}
};
