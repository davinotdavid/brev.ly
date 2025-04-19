import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const generateReportRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links/generate_report",
    {
      schema: {
        response: {
          200: z.object({
            report_link: z.string().url(),
          }),
        },
      },
    },
    async (_request, response) => {
      await db.select().from(schema.links);

      response.status(200).send({
        report_link: "http://test.com",
      });
    }
  );
};
