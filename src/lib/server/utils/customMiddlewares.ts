import { db } from '$server/database/database';
import { sectionsTable, writingReferencesTable, writingTable } from '$server/database/schema';
import { and, eq } from 'drizzle-orm';

export async function isOwner(writingId: string, userId: string) {
	const isOwner = await db.query.writingTable.findFirst({
		where: and(eq(writingTable.id, writingId), eq(writingTable.ownerId, userId))
	});
	return isOwner != null;
}

export async function isReferenceCreator(title: string, writingId: string, userId: string) {
	const isCreator = await db.query.writingReferencesTable.findFirst({
		where: and(
			eq(writingReferencesTable.title, title),
			eq(writingReferencesTable.writingId, writingId),
			eq(writingReferencesTable.writerId, userId)
		)
	});
	return isCreator != null;
}

export async function isSectionCreator(sectionName: string, writingId: string, userId: string) {
	const isCreator = await db.query.sectionsTable.findFirst({
		where: and(
			eq(sectionsTable.name, sectionName),
			eq(sectionsTable.writingId, writingId),
			eq(sectionsTable.writerId, userId)
		)
	});
	return isCreator != null;
}
