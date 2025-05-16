import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { generateReport } from "@/app/functions/generate-report";
import { unwrapEither } from "@/shared/either";

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
      const result = await generateReport();

      const { reportUrl } = unwrapEither(result);

      response.status(200).send({
        report_link: reportUrl,
      });
    }
  );
};
