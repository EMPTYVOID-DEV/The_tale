import { db } from '$server/database/database';
import {
	keyTable,
	writingContributorsTable,
	writingTable,
	userTable
} from '$server/database/schema';
import type { Key, User } from '$server/types.server';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';

export async function insertUser(newUser: User, key: Key) {
	return db.transaction(async (tx) => {
		await tx.insert(userTable).values(newUser);
		await tx.insert(keyTable).values(key);
	});
}

export async function getMyContributions(userId: string) {
	return db
		.select({
			writingId: writingTable.id,
			role: writingContributorsTable.role,
			writingTime: writingContributorsTable.writingTime,
			writingName: writingTable.name,
			writingBackground: writingTable.background
		})
		.from(writingContributorsTable)
		.where(eq(writingContributorsTable.userId, userId))
		.innerJoin(writingTable, eq(writingContributorsTable.writingId, writingTable.id));
}

export async function addWriting(userId: string, writingName: string) {
	return db.transaction(async (tx) => {
		const id = generateId(8);
		await tx.insert(writingTable).values({ id, name: writingName });
		await tx.insert(writingContributorsTable).values({ role: 'owner', userId, writingId: id });
		return id;
	});
}

export async function getWritingContributors(writingId: string) {
	return db
		.select({
			contributorId: userTable.id,
			contributorUsername: userTable.username,
			contributorAvatar: userTable.avatar,
			writingTime: writingContributorsTable.writingTime
		})
		.from(writingContributorsTable)
		.where(
			and(
				eq(writingContributorsTable.writingId, writingId),
				eq(writingContributorsTable.role, 'writer')
			)
		)
		.innerJoin(userTable, eq(userTable.id, writingContributorsTable.userId));
}
