CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"remote_url" text NOT NULL,
	"access_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_slug_unique" UNIQUE("slug")
);
