import { drizzle } from 'drizzle-orm/node-postgres';
import { DB_URL } from '$env/static/private';
import pg from 'pg';
import * as schema from './schema';

const postgresclient = new pg.Pool({
	connectionString: DB_URL
});

export const db = drizzle(postgresclient, {
	schema
});
