import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { createLink } from "@/app/functions/create-link";
import { isRight, unwrapEither } from "@/shared/either";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a short link",
        body: z.object({
          remoteURL: z.string().url(),
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

      const result = await createLink({ remoteURL, slug });

      if (isRight(result)) {
        return response.status(201).send();
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'SlugAlreadyExists':
          return response.status(400).send({ message: error.message })
        default:
          return response.status(400).send({ message: 'Uncaught internal server error.' })
      }
    }
  );
};
