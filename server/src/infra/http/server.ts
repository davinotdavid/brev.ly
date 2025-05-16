import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import { listLinksRoute } from "./routes/list-links";
import { createLinkRoute } from "./routes/create-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { incrementAccessLinkRoute } from "./routes/increment-access-link";
import { generateReportRoute } from "./routes/generate-report";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// Global error handler (e.g, reusable validation, uncaught 500s)
server.setErrorHandler((error, request, response) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return response.status(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  // TODO: Add observability tool here (Sentry / Datadog / Grafana / OTel)
  console.error(error);

  return response.status(500).send({
    message: "Internal server error",
  });
});

// CORS configuration
server.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "HEAD", "POST", "DELETE"],
});

// Swagger configuration
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "brev.ly",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// Routes
server.register(listLinksRoute);
server.register(createLinkRoute);
server.register(deleteLinkRoute);
server.register(incrementAccessLinkRoute);
server.register(generateReportRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
