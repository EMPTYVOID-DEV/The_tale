import { db } from '$server/database/database';
import {
	keyTable,
	writingContributorsTable,
	writingTable,
	userTable,
	writingReferencesTable,
	sectionsTable
} from '$server/database/schema';
import type { Key, User } from '$server/types.server';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { isOwner, isReferenceCreator, isSectionCreator } from './customMiddlewares';
import { Section } from '$global/types.global';
import type { dataBlock } from '@altron/altron/types';

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
		await tx.insert(writingTable).values({
			id,
			name: writingName,
			ownerId: userId
		});
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

export async function removeReference(title: string, userId: string, writingId: string) {
	const result = await Promise.allSettled([
		isOwner(writingId, userId),
		isReferenceCreator(title, writingId, userId)
	]);
	if (result[0].status == 'rejected' || result[1].status == 'rejected')
		throw new Error('Service unavailable');
	const writingOwner = result[0].value;
	const referenceCreator = result[1].value;
	if (writingOwner || referenceCreator)
		return db
			.delete(writingReferencesTable)
			.where(
				and(
					eq(writingReferencesTable.title, title),
					eq(writingReferencesTable.writingId, writingId)
				)
			);
}

export async function addRootSection(sectionName: string, writingId: string, userId: string) {
	return db.transaction(async (tx) => {
		const section = new Section(sectionName);
		await tx
			.insert(sectionsTable)
			.values({ content: [], writerId: userId, writingId: writingId, name: sectionName });
		await tx
			.update(writingTable)
			.set({ rootSection: section })
			.where(eq(writingTable.id, writingId));
	});
}

export async function updateSection(
	content: dataBlock[],
	sectionName: string,
	userId: string,
	writingId: string
) {
	const result = await Promise.allSettled([
		isOwner(writingId, userId),
		isSectionCreator(sectionName, writingId, userId)
	]);
	if (result[0].status == 'rejected' || result[1].status == 'rejected')
		throw new Error('Service unavailable');
	return db
		.update(sectionsTable)
		.set({ content })
		.where(and(eq(sectionsTable.name, sectionName), eq(sectionsTable.writingId, writingId)));
}
