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
import { and, eq, or, ilike, asc } from 'drizzle-orm';
import { generateId } from 'lucia';
import { isOwner, isReferenceCreator, isSectionCreator } from './customMiddlewares';
import { Section } from '$global/types.global';
import type { dataBlock } from '@altron/altron/types';
import {
	addSectionGraph,
	deleteSectionGraph,
	getParent,
	renameSection
} from '$global/utils.global';
import { queryLimit } from '$global/const.global';

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
			writingName: writingTable.name,
			writingBackground: writingTable.background,
			creationDate: writingTable.creationDate
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
			contributorAvatar: userTable.avatar
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
	writingId: string,
	newName: string
) {
	const result = await Promise.allSettled([
		isOwner(writingId, userId),
		isSectionCreator(sectionName, writingId, userId)
	]);
	if (result[0].status == 'rejected' || result[1].status == 'rejected')
		throw new Error('Service unavailable');
	const writingOwner = result[0].value;
	const sectionCreator = result[1].value;
	if (writingOwner || sectionCreator)
		return db.transaction(async (tx) => {
			const { rootSection } = await tx.query.writingTable.findFirst({
				where: eq(writingTable.id, writingId),
				columns: { rootSection: true }
			});
			const status = renameSection(rootSection, sectionName, newName);
			if (status != 'updated') return status;
			await tx.update(writingTable).set({ rootSection }).where(eq(writingTable.id, writingId));
			await tx
				.update(sectionsTable)
				.set({ content, name: newName })
				.where(and(eq(sectionsTable.name, sectionName), eq(sectionsTable.writingId, writingId)));
			return status;
		});
}

export async function addSection(
	type: 'sibling' | 'child',
	adjacentName: string,
	newSectionName: string,
	userId: string,
	writingId: string
) {
	return db.transaction(async (tx) => {
		const { rootSection } = await tx.query.writingTable.findFirst({
			where: eq(writingTable.id, writingId),
			columns: { rootSection: true }
		});
		const status = addSectionGraph(rootSection, type, newSectionName, adjacentName);
		if (status != 'updated') return status;
		const parent = getParent(rootSection, newSectionName);
		await tx.update(writingTable).set({ rootSection }).where(eq(writingTable.id, writingId));
		await tx.insert(sectionsTable).values({
			name: newSectionName,
			writerId: userId,
			writingId,
			content: [],
			parent
		});
		return status;
	});
}

export async function deleteSection(sectionName: string, userId: string, writingId: string) {
	const result = await Promise.allSettled([
		isOwner(writingId, userId),
		isSectionCreator(sectionName, writingId, userId)
	]);
	if (result[0].status == 'rejected' || result[1].status == 'rejected')
		throw new Error('Service unavailable');
	const writingOwner = result[0].value;
	const sectionCreator = result[1].value;
	if (writingOwner || sectionCreator)
		return db.transaction(async (tx) => {
			let { rootSection } = await tx.query.writingTable.findFirst({
				where: eq(writingTable.id, writingId),
				columns: { rootSection: true }
			});
			if (rootSection.name == sectionName) rootSection = rootSection.sibling;
			else deleteSectionGraph(rootSection, sectionName);
			await tx.update(writingTable).set({ rootSection }).where(eq(writingTable.id, writingId));
			await tx
				.delete(sectionsTable)
				.where(and(eq(sectionsTable.name, sectionName), eq(sectionsTable.writingId, writingId)));
		});
}

export async function queryWritings(query: string, page: number = 1) {
	let offset = 0;
	if (page == 1) offset = 0;
	else offset = (page - 1) * queryLimit - 1;
	return db
		.select({
			background: writingTable.background,
			creationDate: writingTable.creationDate,
			ownerId: writingTable.ownerId,
			ownerUsername: userTable.username,
			ownerAvatar: userTable.avatar,
			name: writingTable.name,
			description: writingTable.description,
			id: writingTable.id
		})
		.from(writingTable)
		.where(
			or(
				ilike(writingTable.name, `%${query}%`),
				ilike(writingTable.id, query),
				ilike(writingTable.ownerId, query)
			)
		)
		.offset(offset)
		.limit(queryLimit)
		.orderBy(asc(writingTable.id))
		.innerJoin(userTable, eq(userTable.id, writingTable.ownerId));
}

export async function getAuthorInfo(authorId: string) {
	const contributionsPromise = getMyContributions(authorId);
	const infoPromise = db.query.userTable.findFirst({
		where: eq(userTable.id, authorId)
	});

	const result = await Promise.allSettled([infoPromise, contributionsPromise]);
	if (result[0].status == 'rejected' || result[1].status == 'rejected')
		throw new Error('Service unavailable');

	return {
		info: result[0].value,
		contributions: result[1].value
	};
}

export async function getWritingInfo(writingId: string) {
	const infoPromise = db.query.writingTable.findFirst({
		where: eq(writingTable.id, writingId),
		columns: {
			colors: false,
			fonts: false
		}
	});
	const referencesPromise = db.query.writingReferencesTable.findMany({
		where: eq(writingReferencesTable.writingId, writingId),
		columns: {
			writerId: false,
			writingId: false
		}
	});

	const contributorsPromise = db
		.select({
			username: userTable.username,
			avatar: userTable.avatar,
			id: userTable.id
		})
		.from(writingContributorsTable)
		.where(eq(writingContributorsTable.writingId, writingId))
		.innerJoin(userTable, eq(userTable.id, writingContributorsTable.userId));

	const results = await Promise.allSettled([infoPromise, referencesPromise, contributorsPromise]);

	if (
		results[0].status == 'rejected' ||
		results[1].status == 'rejected' ||
		results[2].status == 'rejected'
	)
		throw new Error('Service unavailable');

	return {
		info: results[0].value,
		references: results[1].value,
		contributors: results[2].value
	};
}
