import { lucia } from '$server/auth/lucia';
import { pathCheckModes } from '$server/consts.server';
import type { PathCheckModes } from '$server/types.server';
import type { Cookies } from '@sveltejs/kit';
import type { GitHubTokens } from 'arctic';

export async function createSession(cookies: Cookies, id: string) {
	const session = await lucia.createSession(id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		...sessionCookie.attributes,
		path: '/'
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

export function checkPath(pathname: string, checkLevel: PathCheckModes, checkerArray: string[]) {
	const mode = pathCheckModes[checkLevel];
	for (const el of checkerArray) {
		if (mode == 0 && pathname.startsWith(el)) return true;
		if (mode == 1 && pathname.endsWith(el)) return true;
		if (mode == 2 && pathname.includes(el)) return true;
		if (mode == 3 && pathname === el) return true;
	}
	return false;
}
