CREATE TABLE IF NOT EXISTS "blocks" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"data" json NOT NULL,
	"order" integer NOT NULL,
	"section_id" varchar(8) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_contributors" (
	"user_id" varchar(8) NOT NULL,
	"project_id" varchar(8) NOT NULL,
	"role" text NOT NULL,
	"writing_time" integer DEFAULT 0,
	CONSTRAINT "project_contributors_user_id_project_id_pk" PRIMARY KEY("user_id","project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp" timestamp with time zone,
	"project_id" varchar(8) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"name" text,
	"project_id" varchar(8) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "key" ALTER COLUMN "provider_name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "creation_date" SET DEFAULT 'Thu, 25 Apr 2024 12:32:11 GMT';--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "sections_graph" json DEFAULT '{"type":"tier0","section":""}'::json;--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blocks" ADD CONSTRAINT "blocks_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_contributors" ADD CONSTRAINT "project_contributors_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_contributors" ADD CONSTRAINT "project_contributors_project_id_user_id_fk" FOREIGN KEY ("project_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_views" ADD CONSTRAINT "project_views_project_id_user_id_fk" FOREIGN KEY ("project_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sections" ADD CONSTRAINT "sections_project_id_user_id_fk" FOREIGN KEY ("project_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
