export type mailOptions = {
	from: string;
	to: string;
	subject: string;
	text?: string;
	html?: string;
};

export type cookieOptions = {
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
	email: string;
};

export type GithubEmail = {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: string | null;
};
