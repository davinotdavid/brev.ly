import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:slug",
    {
      schema: {
        params: z.object({
          slug: z.string(),
        }),
      },
    },
    async (request, response) => {
      const { slug } = request.params;

      await db.delete(schema.links).where(eq(schema.links.slug, slug));

      return response.status(204).send();
    }
  );
};
