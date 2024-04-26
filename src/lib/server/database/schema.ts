import type {
	projectBanner,
	projectColors,
	projectFonts,
	projectLogo,
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
import type { blocks } from '@altron/altron/types';

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

export const projectTable = pgTable('project', {
	id: varchar('id', { length: 8 }).primaryKey().notNull(),
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
	tempalteName: text('template_name').$type<'sveltekitDocs' | 'nextDocs' | 'nuxtDocs'>().notNull(),
	sectionsGraph: json('sections_graph')
		.$type<sectionsGraph>()
		.default({ type: 'tier0', section: '' })
});

export const projectLinksTable = pgTable(
	'project_links',
	{
		header: text('header').notNull(),
		projectId: varchar('project_id', { length: 8 })
			.notNull()
			.references(() => projectTable.id, {
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

export const projectContributors = pgTable(
	'project_contributors',
	{
		userId: varchar('user_id', { length: 8 })
			.notNull()
			.references(() => userTable.id, {
				onDelete: 'cascade'
			}),
		projectId: varchar('project_id', { length: 8 })
			.notNull()
			.references(() => projectTable.id, {
				onDelete: 'cascade'
			}),
		role: text('role').$type<'owner' | 'manager' | 'writer'>().notNull(),
		// check writing time in seconds when they enter writing page until they save.
		writingTime: integer('writing_time').default(0)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.projectId] })
		};
	}
);

// after one minut reading
export const projectViewsTable = pgTable('project_views', {
	id: serial('id').notNull().primaryKey(),
	// it only considered  a view if reading time exceed certain limit
	timestamp: timestamp('timestamp', { mode: 'date', withTimezone: true }),
	projectId: varchar('project_id', { length: 8 })
		.notNull()
		.references(() => projectTable.id, {
			onDelete: 'cascade'
		})
});

export const sectionsTable = pgTable('sections', {
	id: varchar('id', { length: 8 }).notNull().primaryKey(),
	name: text('name'),
	projectId: varchar('project_id', { length: 8 })
		.notNull()
		.references(() => projectTable.id, {
			onDelete: 'cascade'
		})
});

export const blocksTable = pgTable('blocks', {
	id: varchar('id', { length: 8 }).notNull().primaryKey(),
	name: text('type').$type<blocks>().notNull(),
	data: json('data').notNull(),
	order: integer('order').notNull(),
	sectionId: varchar('section_id', { length: 8 })
		.notNull()
		.references(() => sectionsTable.id, { onDelete: 'cascade' })
});
