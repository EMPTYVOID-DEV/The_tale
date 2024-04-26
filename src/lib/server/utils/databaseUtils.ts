import { db } from '$server/database/database';
import { keyTable, projectContributors, projectTable, userTable } from '$server/database/schema';
import type { key, user } from '$server/types.server';
import { eq } from 'drizzle-orm';

export async function insertUser(newUser: user, key: key) {
	return db.transaction(async (tx) => {
		await tx.insert(userTable).values(newUser);
		await tx.insert(keyTable).values(key);
	});
}

export async function getMyContributions(userId: string) {
	return db
		.select({
			projectId: projectTable.id,
			role: projectContributors.role,
			writingTime: projectContributors.writingTime,
			projectName: projectTable.name,
			projectBanner: projectTable.banner
		})
		.from(projectContributors)
		.where(eq(projectContributors.userId, userId))
		.innerJoin(projectTable, eq(projectContributors.projectId, projectTable.id));
}
