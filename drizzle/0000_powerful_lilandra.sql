CREATE TABLE IF NOT EXISTS "key" (
	"userId" text NOT NULL,
	"provider_name" text NOT NULL,
	"provider_id" text NOT NULL,
	"secret" text,
	"verified" boolean,
	CONSTRAINT "key_provider_id_provider_name_pk" PRIMARY KEY("provider_id","provider_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "key" ADD CONSTRAINT "key_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
