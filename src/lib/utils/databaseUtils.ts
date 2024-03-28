import { db } from '$lib/database/database';
import { keyTable, userTable } from '$lib/database/schema';
import type { key, user } from '$schema/types/server.types';

export async function insertUser(newUser: user, key: key) {
	return db.transaction(async (tx) => {
		await tx.insert(userTable).values(newUser);
		await tx.insert(keyTable).values(key);
	});
}
