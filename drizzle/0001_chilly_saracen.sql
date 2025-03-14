ALTER TABLE "link" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_slug_unique" UNIQUE("slug");