import type { Config } from 'drizzle-kit';

export default {
	schema: 'src/lib/server/database/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.PROD_DB_URL!
	}
} satisfies Config;
