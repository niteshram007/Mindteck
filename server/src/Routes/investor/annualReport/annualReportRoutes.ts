import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { annualReportHandlers } from "./annualReportHandlers";
import {
  JsonAnnualReportSchema,
  AnnualReportSchema,
  JsonAnnualReportUpdateSchema,
  AnnualReportUpdateSchema,
} from "./annualReportSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function annualReportRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Annual Report"]),preHandler:authorize(["SuperAdmin"]) }, annualReportHandlers.uploadImage);

  app.post(
    "/create",
    {
      schema: JsonAnnualReportSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(AnnualReportSchema)],
    },

    annualReportHandlers.createAnnualReport,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonAnnualReportUpdateSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(AnnualReportUpdateSchema)],
    },

    annualReportHandlers.updateAnnualReport,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Annual Report"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    annualReportHandlers.getAnnualReports,
  );

  app.get(
    "/getBySession",
    {
      schema: {
        tags: ["Annual Report"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" },
          },
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },
    annualReportHandlers.getBySession,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Annual Report"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    annualReportHandlers.deleteAnnualReportById,
  );

  app.delete(
    "/:objectId/:id",
    {
      schema: {
        tags: ["Annual Report"],

        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    annualReportHandlers.deleteItemAnnualReportById,
  );
}
