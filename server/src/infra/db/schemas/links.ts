import { uuidv7 } from "uuidv7";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  slug: text("slug").notNull().unique(),
  remoteURL: text("remote_url").notNull(),
  accessCount: integer("access_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
