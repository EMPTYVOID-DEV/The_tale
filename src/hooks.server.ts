import type { theme } from '$global/types.global';
import { lucia } from '$server/auth/lucia';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const themeHook: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html, done }) => {
			if (done) {
				let theme = event.cookies.get('theme') as theme;
				if (!theme) {
					event.cookies.set('theme', 'dark', {
						path: '/',
						httpOnly: false
					});
					theme = 'dark';
				}
				return html.replace('data-theme="light"', `data-theme="${theme}"`);
			}
		}
	});
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
	if (!event.locals.user && event.url.pathname.startsWith('/dashboard')) redirect(302, '/auth');
	if (event.locals.user && event.url.pathname.startsWith('/auth')) redirect(302, '/dashboard');
	return resolve(event);
};

export const handle = sequence(themeHook, luciaHook);
