import { lucia } from '$lib/auth/lucia';
import type { Cookies } from '@sveltejs/kit';
import type { GitHubTokens } from 'arctic';
import type { cookieOptions } from '$schema/types/server.types';

export async function createSession(cookies: Cookies, cookieOptions: cookieOptions, id: string) {
	const session = await lucia.createSession(id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		...cookieOptions,
		...sessionCookie.attributes
	});
}

export async function fetchGithubUser(tokens: GitHubTokens) {
	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken}`
		}
	});
	return githubUserResponse.json();
}
