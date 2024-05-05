import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { uploadFile } from '$server/utils/uploadFile';
import { checkSize, checkType, destructorFileName } from '$global/utils.global';
import { db } from '$server/database/database';
import { userTable } from '$server/database/schema';
import { eq } from 'drizzle-orm';
import { validateUsername } from '$global/zod';
import { lucia } from '$server/auth/lucia';

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
			const { extension, filename } = destructorFileName(avatar.name);
			const name = `${filename}_${id}.${extension}`;
			const url = await uploadFile(avatar, name, 'avatars');
			await db.update(userTable).set({ avatar: url }).where(eq(userTable.id, id));
		} catch (err) {
			error(500, 'Service unavailable');
		}
	},
	changeUsername: async ({ request, locals }) => {
		const fd = await request.formData();
		const username = fd.get('username').toString();
		if (validateUsername(username).state == 'invalid')
			return fail(400, { message: validateUsername(username).errorMsg });
		try {
			await db.update(userTable).set({ username }).where(eq(userTable.id, locals.user.id));
		} catch (err) {
			error(500, 'Service unavailable');
		}
	},
	deleteAccount: async ({ locals, request }) => {
		const fd = await request.formData();
		const confirmation = fd.get('confirmation').toString();
		if (confirmation != locals.user.username)
			return fail(400, { message: 'The confirmation text is not valid' });
		try {
			const id = locals.user.id;
			await lucia.invalidateUserSessions(id);
			await db.delete(userTable).where(eq(userTable.id, id));
		} catch (err) {
			error(500, 'Service unavailable');
		}
		redirect(303, '/');
	},
	logout: async ({ locals }) => {
		const id = locals.user.id;
		try {
			await lucia.invalidateUserSessions(id);
		} catch (error) {
			return fail(500);
		}
		redirect(303, '/');
	}
};
