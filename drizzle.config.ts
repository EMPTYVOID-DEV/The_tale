import type { Config } from "drizzle-kit";

export default {
  schema: "src/lib/database/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
} satisfies Config;
