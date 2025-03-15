import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const linkSchema = pgTable("link", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  name: text().notNull().unique(),
  slug: text().notNull().unique(),
  urlTo: text().notNull(),
  description: text(),
  clicked: integer().$default(() => 0)
});

export const linkHistorySchema = pgTable("history", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	date: timestamp().notNull().defaultNow(),
	number: integer().notNull(),
	linkId: integer().notNull().references(() => linkSchema.id)
  });

export type LinkType = InferSelectModel<typeof linkSchema>
export type LinkHistoryType = InferSelectModel<typeof linkHistorySchema>