import type { keyTable, userTable } from '$server/database/schema';
import { pathCheckModes } from './consts.server';

export type MailOptions = {
	from: string;
	to: string;
	subject: string;
	text?: string;
	html?: string;
};

export type CookieOptions = {
	value?: string;
	maxAge?: number;
	domain?: string;
	path: string;
	secure?: boolean;
	httpOnly?: boolean;
	sameSite?: boolean | 'lax' | 'strict' | 'none';
	crossSite?: boolean;
};

export type GithubUser = {
	id: number;
	login: string;
};

export type User = typeof userTable.$inferInsert;

export type Key = typeof keyTable.$inferInsert;

export type PathCheckModes = keyof typeof pathCheckModes;
