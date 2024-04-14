import { pgTable, text, varchar, primaryKey, boolean, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: varchar('id', { length: 8 }).notNull().primaryKey(),
	username: varchar('username', { length: 28 }).notNull(),
	avatar: text('avatar')
});

export const sessionTable = pgTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: varchar('user_id', { length: 8 })
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const keyTable = pgTable(
	'key',
	{
		userId: varchar('userId', { length: 8 })
			.notNull()
			.references(() => userTable.id, {
				onDelete: 'cascade'
			}),
		provider_name: varchar('provider_name', { length: 12 }).notNull(),
		provider_id: text('provider_id').notNull(),
		secret: text('secret'),
		verified: boolean('verified')
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.provider_id, table.provider_name] })
		};
	}
);
