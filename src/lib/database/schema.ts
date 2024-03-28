import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

// if you have more than provider you may want to replace github_id with provider and provider_id
export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	username: text('username').notNull()
});

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const keyTable = sqliteTable(
	'key',
	{
		userId: text('userId')
			.notNull()
			.references(() => userTable.id, {
				onDelete: 'cascade'
			}),
		provider_name: text('provider_name').notNull(),
		provider_id: text('provider_id').notNull(),
		secret: text('secret'),
		verified: integer('verified')
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.provider_id, table.provider_name] })
		};
	}
);
