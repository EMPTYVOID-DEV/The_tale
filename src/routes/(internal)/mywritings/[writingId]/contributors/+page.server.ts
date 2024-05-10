import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { getWritingContributors } from '$server/utils/databaseUtils';
import { db } from '$server/database/database';
import { and, eq } from 'drizzle-orm';
import { userTable, writingContributorsTable } from '$server/database/schema';

export const load: ServerLoad = async ({ params }) => {
	const writingId = params.writingId;
	const contributors = await getWritingContributors(writingId);
	return { contributors };
};

export const actions: Actions = {
	addContributor: async ({ request, params }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const contributorId = fd.get('contributorId').toString();
		try {
			const contributor = await db.query.userTable.findFirst({
				where: eq(userTable.id, contributorId)
			});
			if (!contributor) return fail(404, { message: 'This user does not exist' });
			await db
				.insert(writingContributorsTable)
				.values({ role: 'writer', userId: contributorId, writingId });
		} catch (error) {
			if (error.code == '23505')
				return fail(409, { message: 'It seems that this contributor already exist' });
		}
	},
	removeContributor: async ({ request, params }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const contributorId = fd.get('contributorId').toString();
		await db
			.delete(writingContributorsTable)
			.where(
				and(
					eq(writingContributorsTable.writingId, writingId),
					eq(writingContributorsTable.userId, contributorId)
				)
			);
	}
};
