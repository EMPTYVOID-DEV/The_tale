import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { validateWritingName } from '$global/zod';
import { addWriting } from '$server/utils/databaseUtils';
import { getMyContributions } from '$server/utils/databaseUtils';
import type { ServerLoad } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const userId = locals.user.id;
		const fd = await request.formData();
		const writingName = fd.get('writingName')?.toString();
		if (validateWritingName(writingName).state == 'invalid')
			return fail(403, { message: validateWritingName(writingName).errorMsg });
		const writingId = await addWriting(userId, writingName).catch(() =>
			error(500, 'Service Unavailable')
		);
		redirect(302, `/mywritings/${writingId}/settings`);
	}
};

export const load: ServerLoad = async ({ locals }) => {
	const userId = locals.user.id;
	const contributions = await getMyContributions(userId);
	return {
		contributions
	};
};
