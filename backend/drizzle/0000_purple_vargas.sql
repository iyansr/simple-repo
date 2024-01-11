CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text,
	"image" text,
	"bio" text,
	"providerAccountId" text NOT NULL,
	"provider_user_name" text NOT NULL,
	"access_token" text,
	"visit_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "user_providerAccountId_unique" UNIQUE("providerAccountId"),
	CONSTRAINT "user_provider_user_name_unique" UNIQUE("provider_user_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visitor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"visitor_id" uuid,
	"last_visit_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visitor" ADD CONSTRAINT "visitor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visitor" ADD CONSTRAINT "visitor_visitor_id_user_id_fk" FOREIGN KEY ("visitor_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
