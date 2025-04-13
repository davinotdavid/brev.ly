import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/links", () => {
    return "POST to Links!";
  });
};
