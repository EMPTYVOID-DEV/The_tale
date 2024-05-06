import type {
	background,
	writingColors,
	writingFonts,
	writingLogo,
	sectionsGraph
} from '$global/types.global';
import {
	pgTable,
	text,
	varchar,
	primaryKey,
	serial,
	boolean,
	timestamp,
	date,
	json,
	integer
} from 'drizzle-orm/pg-core';
import type { dataBlock } from '@altron/altron/types';

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
		provider_name: text('provider_name').$type<'email' | 'github'>().notNull(),
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

export const writingTable = pgTable('writing', {
	id: varchar('id', { length: 8 }).primaryKey().notNull(),
	name: text('name').notNull(),
	description: text('description').notNull().default(''),
	background: json('background').$type<background>().default({ type: 'color', value: '#dfdafa' }),
	creationDate: date('creation_date').default(new Date().toUTCString()),
	multiTheme: boolean('mutli_theme').default(false),
	withSearch: boolean('with_search').default(false),
	logo: json('logo').$type<writingLogo>(),
	fonts: json('fonts')
		.$type<writingFonts>()
		.default({
			heading: { id: 'anek-tamil', subset: 'latin' },
			body: { id: 'aileron', subset: 'latin' }
		}),
	colors: json('colors')
		.$type<writingColors>()
		.default({ main: { text: 'dfdafa', bg: '040110', primary: '6f3dd4' } }),
	tempalteName: text('template_name')
		.$type<'sveltekitDocs' | 'nextDocs' | 'nuxtDocs'>()
		.default('nextDocs'),
	sectionsGraph: json('sections_graph')
		.$type<sectionsGraph>()
		.default({ type: 'tier0', section: '' })
});

export const writingLinksTable = pgTable(
	'writing_links',
	{
		header: text('header').notNull(),
		writingId: varchar('writing_id', { length: 8 })
			.notNull()
			.references(() => writingTable.id, {
				onDelete: 'cascade'
			}),
		description: text('descritpion').notNull(),
		href: text('href').notNull()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.header, table.writingId] })
		};
	}
);

export const writingContributors = pgTable(
	'writing_contributors',
	{
		userId: varchar('user_id', { length: 8 })
			.notNull()
			.references(() => userTable.id, {
				onDelete: 'cascade'
			}),
		writingId: varchar('writing_id', { length: 8 })
			.notNull()
			.references(() => writingTable.id, {
				onDelete: 'cascade'
			}),
		role: text('role').$type<'owner' | 'writer'>().notNull(),
		// check writing time in seconds when they enter writing page until they save.
		writingTime: integer('writing_time').default(0)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.writingId] })
		};
	}
);

/**
 * we track writing views per day
 * any user whether authenticated or not enters and view the writing for specific amount of time we consider it a value
 * for the rest of the day any view from same user is rejected
 * we can use either localStorage or cookies to track the old view
 * */
export const writingViewsTable = pgTable('writing_views', {
	id: serial('id').notNull().primaryKey(),
	timestamp: timestamp('timestamp', { mode: 'date', withTimezone: true }),
	writingId: varchar('writing_id', { length: 8 })
		.notNull()
		.references(() => writingTable.id, {
			onDelete: 'cascade'
		})
});

export const sectionsTable = pgTable('sections', {
	id: varchar('id', { length: 8 }).notNull().primaryKey(),
	name: text('name'),
	content: json('content').array().$type<dataBlock[]>().notNull(),
	writingId: varchar('writing_id', { length: 8 })
		.notNull()
		.references(() => writingTable.id, {
			onDelete: 'cascade'
		})
});
