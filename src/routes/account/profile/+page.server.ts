import { fail, type Actions } from '@sveltejs/kit';
import { uploadFile } from '$server/utils/uploadFile';
import { checkSize, checkType } from '$global/utils.global';
import { db } from '$server/database/database';
import { userTable } from '$server/database/schema';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	changeAvatar: async ({ request, locals }) => {
		const fd = await request.formData();
		const avatar = fd.get('avatar') as File;
		if (avatar.size == 0) return fail(400, { message: "You hav'nt upload an image" });
		if (!checkType('image/*', avatar.type))
			return fail(400, { message: 'You should upload an image file format.' });
		if (!checkSize(1200, avatar.size))
			return fail(400, { message: 'Your avatar size should be less than 1.2mb.' });

		try {
			const { id } = locals.user;
			const name = `${id}.${avatar.name.split('.').at(-1)}`;
			const url = await uploadFile(avatar, name, 'avatars');
			await db.update(userTable).set({ avatar: url }).where(eq(userTable.id, id));
		} catch (error) {
			return fail(500, { message: 'Failed to save the avatar' });
		}
	}
};
