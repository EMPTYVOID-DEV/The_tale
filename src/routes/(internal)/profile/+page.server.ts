import { fail, redirect, type Actions } from '@sveltejs/kit';
import { uploadFile } from '$server/utils/uploadFile';
import { checkSize, checkType, destructorFileName } from '$global/utils.global';
import { db } from '$server/database/database';
import { userTable } from '$server/database/schema';
import { eq } from 'drizzle-orm';
import { descriptionSchema, getValidator, usernameSchema } from '$global/zod';
import { lucia } from '$server/auth/lucia';
import uuid from 'short-uuid';
import sha256 from 'crypto-js/sha256';
import base64 from 'crypto-js/enc-base64';

export const actions: Actions = {
	resetKey: async ({ locals }) => {
		const { id } = locals.user;
		const apiKey = uuid().generate();
		const hashedApiKey = sha256(apiKey).toString(base64);
		await db.update(userTable).set({ apiKey: hashedApiKey }).where(eq(userTable.id, id));
		return { apiKey };
	},
	changeAvatar: async ({ request, locals }) => {
		const fd = await request.formData();
		const avatar = fd.get('avatar') as File;
		if (avatar.size == 0) return fail(400, { message: "You hav'nt upload an image" });
		if (!checkType('image/*', avatar.type))
			return fail(400, { message: 'You should upload an image file format.' });
		if (!checkSize(2500, avatar.size))
			return fail(400, { message: 'Your avatar size should be less than 2.5mb.' });
		const { id } = locals.user;
		const { extension, filename } = destructorFileName(avatar.name);
		const name = `${filename}_${id}.${extension}`;
		const url = await uploadFile(avatar, name, 'avatars');
		await db.update(userTable).set({ avatar: url }).where(eq(userTable.id, id));
	},
	changeUsername: async ({ request, locals }) => {
		const fd = await request.formData();
		const username = fd.get('username').toString();
		const validateUsername = getValidator(usernameSchema);
		if (validateUsername(username).state == 'invalid')
			return fail(400, { message: validateUsername(username).errorMsg });
		await db.update(userTable).set({ username }).where(eq(userTable.id, locals.user.id));
	},
	changeAbout: async ({ request, locals }) => {
		const { id } = locals.user;
		const fd = await request.formData();
		const about = fd.get('about').toString();
		const validateAbout = getValidator(descriptionSchema);
		if (validateAbout(about).state == 'invalid')
			return fail(400, { message: validateAbout(about).errorMsg });
		await db.update(userTable).set({ about }).where(eq(userTable.id, id));
	},
	deleteAccount: async ({ locals, request }) => {
		const fd = await request.formData();
		const confirmation = fd.get('confirmation').toString();
		if (confirmation != locals.user.username)
			return fail(400, { message: 'The confirmation text is not valid' });
		const id = locals.user.id;
		await db.delete(userTable).where(eq(userTable.id, id));
		redirect(303, '/');
	},
	logout: async ({ locals }) => {
		const id = locals.user.id;
		await lucia.invalidateUserSessions(id);
		redirect(303, '/');
	}
};
