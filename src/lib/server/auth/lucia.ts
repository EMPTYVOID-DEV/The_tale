import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { dev } from '$app/environment';
import { Lucia, TimeSpan } from 'lucia';
import { db } from '$server/database/database';
import { sessionTable, userTable } from '$server/database/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(7, 'd'),
	getUserAttributes: (attributes: DatabaseUserAttributes) => {
		return {
			username: attributes.username,
			avatar: attributes.avatar,
			about: attributes.about
		};
	},
	sessionCookie: {
		attributes: {
			secure: !dev,
			sameSite: 'strict'
		}
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseSessionAttributes {}

interface DatabaseUserAttributes {
	username: string;
	avatar: string;
	about: string;
}
