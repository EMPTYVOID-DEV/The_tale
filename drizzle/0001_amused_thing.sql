DROP TABLE "blocks";--> statement-breakpoint
ALTER TABLE "writing" ALTER COLUMN "description" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "writing" ALTER COLUMN "creation_date" SET DEFAULT 'Sat, 27 Apr 2024 18:09:56 GMT';--> statement-breakpoint
ALTER TABLE "writing" ALTER COLUMN "template_name" SET DEFAULT 'nextDocs';--> statement-breakpoint
ALTER TABLE "writing" ALTER COLUMN "template_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "sections" ADD COLUMN "content" json[] DEFAULT [object Object];