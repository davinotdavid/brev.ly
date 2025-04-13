import { randomUUID } from "node:crypto";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  slug: text("slug").notNull().unique(),
  remoteURL: text("remote_url").notNull(),
  accessCount: integer("access_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
