import type { WritingColors, WritingFonts, Section } from '$global/types.global';
import {
	pgTable,
	text,
	varchar,
	primaryKey,
	boolean,
	timestamp,
	date,
	json,
	unique,
	foreignKey
} from 'drizzle-orm/pg-core';
import type { dataBlock } from '@altron/altron/types';
import { defaultBgUrl, defaultColors, defaultFonts } from '$global/const.global';
import { sql } from 'drizzle-orm';

export const userTable = pgTable('user', {
	id: varchar('id', { length: 8 }).notNull().primaryKey(),
	username: varchar('username', { length: 28 }).notNull(),
	about: text('about').default(''),
	avatar: text('avatar'),
	apiKey: text('api_key')
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
	background: text('background').default(defaultBgUrl),
	creationDate: date('creation_date', { mode: 'string' }).$defaultFn(
		() => new Date().toISOString().split('T')[0]
	),
	tags: text('tags')
		.array()
		.default(sql`'{}'::text[]`),
	fonts: json('fonts').$type<WritingFonts>().default(defaultFonts),
	colors: json('colors').$type<WritingColors>().default(defaultColors),
	rootSection: json('root_section').$type<Section>(),
	ownerId: varchar('owner_id', { length: 8 })
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	private: boolean('private').default(false)
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
		writerId: varchar('writer_id', { length: 8 }).references(() => userTable.id, {
			onDelete: 'set null'
		})
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
		role: text('role').$type<'owner' | 'writer'>().notNull()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.writingId], name: 'contributor_primary' })
		};
	}
);

export const sectionsTable = pgTable(
	'sections',
	{
		name: text('name').notNull(),
		content: json('content').array().$type<dataBlock[]>().notNull(),
		writingId: varchar('writing_id', { length: 8 })
			.notNull()
			.references(() => writingTable.id, {
				onDelete: 'cascade'
			}),
		writerId: varchar('writer_id', { length: 8 }).references(() => userTable.id, {
			onDelete: 'set null'
		}),
		parent: text('parent')
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.name, table.writingId] }),
			parentReference: foreignKey({
				columns: [table.parent, table.writingId],
				foreignColumns: [table.name, table.writingId]
			}).onDelete('cascade')
		};
	}
);
