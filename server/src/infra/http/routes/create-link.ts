import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a short link",
        body: z.object({
          remoteURL: z.string(),
          slug: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            remoteURL: z.string(),
            slug: z.string(),
            accessCount: z.number(),
            createdAt: z.string(),
          }),
          409: z
            .object({ message: z.string() })
            .describe("Link slug already exists"),
        },
      },
    },
    async (request, response) => {
      const { remoteURL, slug } = request.body;

      await db.insert(schema.links).values({
        slug,
        remoteURL,
      });

      return response.status(201).send();
    }
  );
};
