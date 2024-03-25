import { db } from '$lib/database/database';

export const load = async () => {
	const users = await db.query.userTable.findMany();
	console.log(users);
	return { users };
};
