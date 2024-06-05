import { createPool } from '@vercel/postgres';
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { VercelPgDatabase } from 'drizzle-orm/vercel-postgres';
import { DEV_DB_URL, PROD_DB_URL } from '$env/static/private';
import pg from 'pg';
import * as schema from './schema';
import { dev } from '$app/environment';

export let db: NodePgDatabase<typeof schema> | VercelPgDatabase<typeof schema>;

if (dev) {
	const postgresclient = new pg.Pool({
		connectionString: DEV_DB_URL
	});
	db = drizzleNode(postgresclient, {
		schema
	});
} else {
	const vercelClient = createPool({ connectionString: PROD_DB_URL });
	db = drizzleVercel(vercelClient, {
		schema
	});
}
