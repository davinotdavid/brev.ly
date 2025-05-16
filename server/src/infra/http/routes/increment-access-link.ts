import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq, sql } from "drizzle-orm";

export const incrementAccessLinkRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.post(
    "/links/:slug/accessed",
    {
      schema: {
        params: z.object({
          slug: z.string(),
        }),
        response: {
          200: z.object({
            remote_url: z.string(),
          })
        }
      },
    },
    async (request, response) => {
      const { slug } = request.params;

      const dbResponse = await db
        .update(schema.links)
        .set({
          accessCount: sql`${schema.links.accessCount} + 1`,
        })
        .where(eq(schema.links.slug, slug))
        .returning({
          remoteUrl: schema.links.remoteURL
        });

      response.status(200).send({
        remote_url: dbResponse[0].remoteUrl 
      });
    }
  );
};
