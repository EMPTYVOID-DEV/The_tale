import { db } from '$server/database/database';
import { keyTable, writingContributors, writingTable, userTable } from '$server/database/schema';
import type { key, user } from '$server/types.server';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';

export async function insertUser(newUser: user, key: key) {
	return db.transaction(async (tx) => {
		await tx.insert(userTable).values(newUser);
		await tx.insert(keyTable).values(key);
	});
}

export async function getMyContributions(userId: string) {
	return db
		.select({
			writingId: writingTable.id,
			role: writingContributors.role,
			writingTime: writingContributors.writingTime,
			writingName: writingTable.name,
			writingBackground: writingTable.background
		})
		.from(writingContributors)
		.where(eq(writingContributors.userId, userId))
		.innerJoin(writingTable, eq(writingContributors.writingId, writingTable.id));
}

export async function addWriting(userId: string, writingName: string) {
	return db.transaction(async (tx) => {
		const id = generateId(8);
		await tx.insert(writingTable).values({ id, name: writingName });
		await tx.insert(writingContributors).values({ role: 'owner', userId, writingId: id });
		return id;
	});
}

export async function getWritingContributors(writingId: string) {
	return db
		.select({
			contributorId: userTable.id,
			contributorUsername: userTable.username,
			contributorAvatar: userTable.avatar,
			writingTime: writingContributors.writingTime
		})
		.from(writingContributors)
		.where(
			and(eq(writingContributors.writingId, writingId), eq(writingContributors.role, 'writer'))
		)
		.innerJoin(userTable, eq(userTable.id, writingContributors.userId));
}
