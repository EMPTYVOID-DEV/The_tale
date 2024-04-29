import { db } from '$server/database/database';
import { writingContributors } from '$server/database/schema';
import { redirect, type ServerLoad } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load: ServerLoad = async ({ params, locals }) => {
	const writingId = params.writingId;
	const userId = locals.user.id;
	const isPermitted = await db.query.writingContributors.findFirst({
		where: and(eq(writingContributors.writingId, writingId), eq(writingContributors.userId, userId))
	});
	if (!isPermitted) redirect(302, '/mywritings');
};
