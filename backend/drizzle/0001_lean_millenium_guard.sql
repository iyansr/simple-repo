ALTER TABLE "user" ADD COLUMN "followers" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "following" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "public_repos" integer DEFAULT 0;