CREATE TABLE IF NOT EXISTS "project_links" (
	"header" text NOT NULL,
	"project_id" varchar(8) NOT NULL,
	"descritpion" text NOT NULL,
	"href" text NOT NULL,
	CONSTRAINT "project_links_header_project_id_pk" PRIMARY KEY("header","project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"user_id" varchar(8) NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"banner" json DEFAULT '{"type":"color","value":"6f3dd4"}'::json,
	"creation_date" date DEFAULT 'Wed, 24 Apr 2024 10:23:59 GMT',
	"mutli_theme" boolean DEFAULT false,
	"with_search" boolean DEFAULT false,
	"logo" json,
	"fonts" json DEFAULT '{"heading":{"id":"anek-tamil","subset":"latin"},"body":{"id":"aileron","subset":"latin"}}'::json,
	"colors" json DEFAULT '{"main":{"text":"dfdafa","bg":"040110","primary":"6f3dd4"}}'::json,
	"template_name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "key" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "key" DROP CONSTRAINT "key_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "key" ADD CONSTRAINT "key_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_links" ADD CONSTRAINT "project_links_project_id_user_id_fk" FOREIGN KEY ("project_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
