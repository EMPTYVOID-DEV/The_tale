import type {
	Background,
	WritingColors,
	WritingFonts,
	Section,
	Templates
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
	integer,
	unique
} from 'drizzle-orm/pg-core';
import type { dataBlock } from '@altron/altron/types';
import { defaultColors, defaultFonts } from '$global/const.global';

export const userTable = pgTable('user', {
	id: varchar('id', { length: 8 }).notNull().primaryKey(),
	username: varchar('username', { length: 28 }).notNull(),
	avatar: text('avatar')
});

export const sessionTable = pgTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: varchar('user_id', { length: 8 })
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
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
	background: json('background').$type<Background>().default({ type: 'color', value: '#dfdafa' }),
	creationDate: date('creation_date').default(new Date().toUTCString()),
	logo: text('logo'),
	fonts: json('fonts').$type<WritingFonts>().default(defaultFonts),
	colors: json('colors').$type<WritingColors>().default(defaultColors),
	tempalteName: text('template_name').$type<Templates>().default('Sveltekit'),
	rootSection: json('root_section').$type<Section>().notNull(),
	ownerId: varchar('owner_id', { length: 8 })
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' })
});

export const writingReferencesTable = pgTable(
	'writing_references',
	{
		title: text('title').notNull(),
		writingId: varchar('writing_id', { length: 8 })
			.notNull()
			.references(() => writingTable.id, {
				onDelete: 'cascade'
			}),
		description: text('description').notNull(),
		href: text('href').notNull(),
		writerId: varchar('writer_id', { length: 8 })
			.notNull()
			.references(() => userTable.id, { onDelete: 'set null' })
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.title, table.writingId], name: 'reference_primary' }),
			uniqueHref: unique('unique_href').on(table.writingId, table.href)
		};
	}
);

export const writingContributorsTable = pgTable(
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
			pk: primaryKey({ columns: [table.userId, table.writingId], name: 'contributor_primary' })
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

export const sectionsTable = pgTable(
	'sections',
	{
		name: text('name'),
		content: json('content').array().$type<dataBlock[]>().notNull(),
		writingId: varchar('writing_id', { length: 8 })
			.notNull()
			.references(() => writingTable.id, {
				onDelete: 'cascade'
			}),
		writerId: varchar('writer_id', { length: 8 })
			.notNull()
			.references(() => userTable.id, { onDelete: 'set null' })
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.name, table.writingId] })
		};
	}
);
