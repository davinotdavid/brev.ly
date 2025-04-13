import type { FastifyInstance } from "fastify";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export function listLinksRoute(server: FastifyInstance) {
  server.get("/links", async () => {
    const links = await db.select().from(schema.links);

    return links;
  });
}
