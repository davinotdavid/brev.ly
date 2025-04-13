import type { FastifyInstance } from "fastify";

export function listLinksRoute(server: FastifyInstance) {
  server.get("/links", () => {
    return "GET to /links!";
  });
}
