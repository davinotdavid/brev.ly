import type { FastifyInstance } from "fastify";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { getLinks } from "@/app/functions/get-links";
import { unwrapEither } from "@/shared/either";

export function listLinksRoute(server: FastifyInstance) {
  server.get("/links", async () => {
    const linkResult = await getLinks({});
    const { links } = unwrapEither(linkResult);

    return links;
  });
}
