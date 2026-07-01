import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { SubsidiariesFinancialHandlers } from "./subsidiariesFinancialHandlers";
import {
  JsonSubsidiariesFinancialSchema,
  JsonShareHoldingUpdatePatternSchema,
  SubsidiariesFinancialSchema,
  SubsidiariesFinancialUpdateSchema,
} from "./subsidiariesFinancialSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function subsidiariesFinancialRoutes(app: FastifyInstance) {
  app.post(
    "/upload",
    { schema: uploadSchema(["Subsidiaries Financial"]), preHandler: authorize(["SuperAdmin"]) },
    SubsidiariesFinancialHandlers.uploadImage,
  );
  app.post(
    "/create",
    {
      schema: JsonSubsidiariesFinancialSchema,
      preHandler: [authorize(["SuperAdmin"]), validate(SubsidiariesFinancialSchema)],
    },

    SubsidiariesFinancialHandlers.createSubsidiariesFinancial,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonShareHoldingUpdatePatternSchema,
      preHandler: [authorize(["SuperAdmin"]), validate(SubsidiariesFinancialUpdateSchema)],
    },

    SubsidiariesFinancialHandlers.updateSubsidiariesFinancial,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Subsidiaries Financial"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    SubsidiariesFinancialHandlers.getSubsidiariesFinancial,
  );

  app.get(
    "/getallBySession",
    {
      schema: {
        tags: ["Subsidiaries Financial"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" }, // Optional session parameter
          },
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    SubsidiariesFinancialHandlers.getBySessionSubsidiariesFinancial,
  );

  app.get(
    "/getallActive",
    {
      schema: {
        tags: ["Subsidiaries Financial"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    SubsidiariesFinancialHandlers.getActiveSubsidiariesFinancial,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Subsidiaries Financial"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    SubsidiariesFinancialHandlers.deleteSubsidiariesFinancialById,
  );

  app.delete(
    "/:objectId/:id",
    {
      schema: {
        tags: ["Subsidiaries Financial"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    SubsidiariesFinancialHandlers.deleteItemSubsidiariesFinancialById,
  );
}
