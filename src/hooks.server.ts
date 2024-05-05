import { lucia } from '$server/auth/lucia';
import { db } from '$server/database/database';
import { writingContributors } from '$server/database/schema';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { and, eq } from 'drizzle-orm';

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

	if (!user && (pathname === '/profile' || pathname.startsWith('/mywritings'))) {
		redirect(302, '/auth');
	}

	if (user && pathname === '/auth') {
		redirect(302, '/mywritings');
	}

	if (!writingId) return resolve(event);

	const contributor = await db.query.writingContributors.findFirst({
		where: and(eq(writingContributors.writingId, writingId), eq(writingContributors.userId, userId))
	});

	if (!contributor) {
		redirect(302, '/mywritings');
	}

	const writingSection = pathname.split('/').at(-1);

	if (
		contributor.role === 'writer' &&
		['template', 'general', 'contributors'].includes(writingSection)
	) {
		redirect(302, '/mywritings');
	}

	return resolve(event);
};

export const handle = sequence(luciaHook, authHook);
