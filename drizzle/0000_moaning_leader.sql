CREATE TABLE IF NOT EXISTS "blocks" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"data" json NOT NULL,
	"order" integer NOT NULL,
	"section_id" varchar(8) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "key" (
	"user_id" varchar(8) NOT NULL,
	"provider_name" text NOT NULL,
	"provider_id" text NOT NULL,
	"secret" text,
	"verified" boolean,
	CONSTRAINT "key_provider_id_provider_name_pk" PRIMARY KEY("provider_id","provider_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"name" text,
	"writing_id" varchar(8) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" varchar(8) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"username" varchar(28) NOT NULL,
	"avatar" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "writing_contributors" (
	"user_id" varchar(8) NOT NULL,
	"writing_id" varchar(8) NOT NULL,
	"role" text NOT NULL,
	"writing_time" integer DEFAULT 0,
	CONSTRAINT "writing_contributors_user_id_writing_id_pk" PRIMARY KEY("user_id","writing_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "writing_links" (
	"header" text NOT NULL,
	"writing_id" varchar(8) NOT NULL,
	"descritpion" text NOT NULL,
	"href" text NOT NULL,
	CONSTRAINT "writing_links_header_writing_id_pk" PRIMARY KEY("header","writing_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "writing" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"banner" json DEFAULT '{"type":"color","value":"6f3dd4"}'::json,
	"creation_date" date DEFAULT 'Sat, 27 Apr 2024 15:28:21 GMT',
	"mutli_theme" boolean DEFAULT false,
	"with_search" boolean DEFAULT false,
	"logo" json,
	"fonts" json DEFAULT '{"heading":{"id":"anek-tamil","subset":"latin"},"body":{"id":"aileron","subset":"latin"}}'::json,
	"colors" json DEFAULT '{"main":{"text":"dfdafa","bg":"040110","primary":"6f3dd4"}}'::json,
	"template_name" text NOT NULL,
	"sections_graph" json DEFAULT '{"type":"tier0","section":""}'::json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "writing_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp" timestamp with time zone,
	"writing_id" varchar(8) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blocks" ADD CONSTRAINT "blocks_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "key" ADD CONSTRAINT "key_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sections" ADD CONSTRAINT "sections_writing_id_writing_id_fk" FOREIGN KEY ("writing_id") REFERENCES "writing"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "writing_contributors" ADD CONSTRAINT "writing_contributors_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "writing_contributors" ADD CONSTRAINT "writing_contributors_writing_id_writing_id_fk" FOREIGN KEY ("writing_id") REFERENCES "writing"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "writing_links" ADD CONSTRAINT "writing_links_writing_id_writing_id_fk" FOREIGN KEY ("writing_id") REFERENCES "writing"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "writing_views" ADD CONSTRAINT "writing_views_writing_id_writing_id_fk" FOREIGN KEY ("writing_id") REFERENCES "writing"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
