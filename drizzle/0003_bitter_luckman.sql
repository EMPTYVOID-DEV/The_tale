ALTER TABLE "key" ALTER COLUMN "userId" SET DATA TYPE varchar(8);--> statement-breakpoint
ALTER TABLE "key" ALTER COLUMN "provider_name" SET DATA TYPE varchar(12);--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "user_id" SET DATA TYPE varchar(8);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE varchar(8);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE varchar(28);