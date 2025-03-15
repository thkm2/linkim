CREATE TABLE "history" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "history_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" timestamp DEFAULT now() NOT NULL,
	"number" integer NOT NULL,
	"linkId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "history" ADD CONSTRAINT "history_linkId_link_id_fk" FOREIGN KEY ("linkId") REFERENCES "public"."link"("id") ON DELETE no action ON UPDATE no action;