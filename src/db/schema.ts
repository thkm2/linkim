import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const linkSchema = pgTable("link", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
  slug: text().notNull().unique(),
  urlTo: text().notNull(),
  description: text(),
  clicked: integer().$default(() => 0)
});

export type LinkType = InferSelectModel<typeof linkSchema>