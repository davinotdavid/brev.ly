import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/links", async () => {
    // Testing
    await db.insert(schema.links).values({
      slug: "aBcD21",
      remoteURL: "https://www.google.com",
    });

    return "POST to Links!";
  });
};
