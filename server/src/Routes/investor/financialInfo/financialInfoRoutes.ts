import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { financialInfoHandlers } from "./financialInfoHandlers";
import { JsonFinancialInfoSchema, FinancialInfoSchema, JsonFinancialInfoUpdateSchema, FinancialInfoUpdateSchema } from "./financialInfoSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function financialInfoRoutes(app: FastifyInstance) {
  
app.post("/upload", { schema: uploadSchema(["Financial Info"]),preHandler:authorize(["SuperAdmin"]) }, financialInfoHandlers.uploadImage);
  
  app.post(
    "/create",
    {
      schema: JsonFinancialInfoSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(FinancialInfoSchema)],
    },

    financialInfoHandlers.createFinancialInfo,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonFinancialInfoUpdateSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(FinancialInfoUpdateSchema)],
    },

    financialInfoHandlers.updateFinancialInfo,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Financial Info"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    financialInfoHandlers.getFinancialInfos,
  );

   app.get(
      "/getBySession",
      {
        schema: {
          tags: ["Financial Info"],
          querystring: {
            type: "object",
            properties: {
              session: { type: "string" }, // Optional session parameter
            },
          },
        },
        preHandler: authorize(["SuperAdmin"])
      },
      financialInfoHandlers.getBySession,
    );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Financial Info"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    financialInfoHandlers.deleteFinancialInfoById,
  );

  app.delete(
    "/:objectId/:id",
    {
      schema: {
        tags: ["Financial Info"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    financialInfoHandlers.deleteItemFinancialInfoById,
  );
}
