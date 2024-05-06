import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { getWritingContributors } from '$server/utils/databaseUtils';
import { db } from '$server/database/database';
import { and, eq } from 'drizzle-orm';
import { userTable, writingContributors } from '$server/database/schema';

export const load: ServerLoad = async ({ params }) => {
	const writingId = params.writingId;
	try {
		const contributors = await getWritingContributors(writingId);
		return { contributors };
	} catch (err) {
		error(500, 'Service unavailable');
	}
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
				.insert(writingContributors)
				.values({ role: 'writer', userId: contributorId, writingId });
		} catch (error) {
			error(500, 'Service unavailable');
		}
	},
	removeContributor: async ({ request, params }) => {
		const writingId = params.writingId;
		const fd = await request.formData();
		const contributorId = fd.get('contributorId').toString();

		try {
			await db
				.delete(writingContributors)
				.where(
					and(
						eq(writingContributors.writingId, writingId),
						eq(writingContributors.userId, contributorId)
					)
				);
		} catch (error) {
			error(500, 'Service unavailable');
		}
	}
};
