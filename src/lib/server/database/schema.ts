import type { projectBanner, projectColors, projectFonts, projectLogo } from '$global/types.global';
import {
	pgTable,
	text,
	varchar,
	primaryKey,
	boolean,
	timestamp,
	date,
	json
} from 'drizzle-orm/pg-core';

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
		userId: varchar('user_id', { length: 8 })
			.notNull()
			.references(() => userTable.id, {
				onDelete: 'cascade'
			}),
		provider_name: varchar('provider_name', { length: 12 }).$type<'email' | 'github'>().notNull(),
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

export const projectTable = pgTable('project', {
	id: varchar('id', { length: 8 }).primaryKey().notNull(),
	userId: varchar('user_id', { length: 8 })
		.notNull()
		.references(() => userTable.id, {
			onDelete: 'cascade'
		}),
	name: text('name').notNull(),
	description: text('description').notNull(),
	banner: json('banner').$type<projectBanner>().default({ type: 'color', value: '6f3dd4' }),
	creationDate: date('creation_date').default(new Date().toUTCString()),
	multiTheme: boolean('mutli_theme').default(false),
	withSearch: boolean('with_search').default(false),
	logo: json('logo').$type<projectLogo>(),
	fonts: json('fonts')
		.$type<projectFonts>()
		.default({
			heading: { id: 'anek-tamil', subset: 'latin' },
			body: { id: 'aileron', subset: 'latin' }
		}),
	colors: json('colors')
		.$type<projectColors>()
		.default({ main: { text: 'dfdafa', bg: '040110', primary: '6f3dd4' } }),
	tempalteName: text('template_name').$type<'sveltedocs' | 'next'>().notNull()
});

export const projectLinksTable = pgTable(
	'project_links',
	{
		header: text('header').notNull(),
		projectId: varchar('project_id', { length: 8 })
			.notNull()
			.references(() => userTable.id, {
				onDelete: 'cascade'
			}),
		description: text('descritpion').notNull(),
		href: text('href').notNull()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.header, table.projectId] })
		};
	}
);
