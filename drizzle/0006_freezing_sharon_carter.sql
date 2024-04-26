ALTER TABLE "project_contributors" DROP CONSTRAINT "project_contributors_project_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project_links" DROP CONSTRAINT "project_links_project_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project_views" DROP CONSTRAINT "project_views_project_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "sections" DROP CONSTRAINT "sections_project_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "creation_date" SET DEFAULT 'Fri, 26 Apr 2024 09:25:04 GMT';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_contributors" ADD CONSTRAINT "project_contributors_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_links" ADD CONSTRAINT "project_links_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_views" ADD CONSTRAINT "project_views_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sections" ADD CONSTRAINT "sections_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
