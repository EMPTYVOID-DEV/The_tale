import { lucia } from '$server/auth/lucia';
import { db } from '$server/database/database';
import { writingContributorsTable } from '$server/database/schema';
import { checkPath } from '$server/utils/authUtils';
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { and, eq } from 'drizzle-orm';

// TODO: add code theme selection form in template page

export const handleError: HandleServerError = async ({ error }) => {
	console.log(error);
	return {
		message: 'Service Unavailable'
	};
};



const luciaHook: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
	} else {
		const { session, user } = await lucia.validateSession(sessionId);
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		event.locals.user = user;
		event.locals.session = session;
	}
	return resolve(event);
};

const authHook: Handle = async ({ resolve, event }) => {
	const user = event.locals.user;
	const pathname = event.url.pathname;
	const writingId = event.params.writingId;
	const userId = user?.id;
	if (!user && checkPath(pathname, 'start', ['/profile', '/mywritings'])) {
		redirect(302, '/auth');
	}

	if (user && checkPath(pathname, 'start', ['/auth'])) {
		redirect(302, '/mywritings');
	}

	if (checkPath(pathname, 'start', ['/mywritings']) && writingId) {
		const contributor = await db.query.writingContributorsTable.findFirst({
			where: and(
				eq(writingContributorsTable.writingId, writingId),
				eq(writingContributorsTable.userId, userId)
			)
		});

		if (!contributor) {
			redirect(302, '/mywritings');
		}

		if (
			contributor.role === 'writer' &&
			checkPath(pathname, 'end', ['template', 'general', 'contributors'])
		) {
			redirect(302, '/mywritings');
		}
	}

	return resolve(event);
};

export const handle = sequence(luciaHook, authHook);
