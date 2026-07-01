import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { stockExchangeFilingHandlers } from "./stockExchangeFillingHandlers";
import { JsonStockExchangeFilingSchema, JsonStockExchangeFilingUpdateSchema, StockExchangeFilingSchema, StockExchangeFilingUpdateSchema } from "./stockExchangeFillingSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function stockExchangeFilingRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Stock Exchange Filing"]), preHandler:authorize(["SuperAdmin"]) }, stockExchangeFilingHandlers.uploadImage);
  
  app.post(
    "/create",
    {
      schema: JsonStockExchangeFilingSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(StockExchangeFilingSchema)],
    },

    stockExchangeFilingHandlers.createStockExchangeFiling,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonStockExchangeFilingUpdateSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(StockExchangeFilingUpdateSchema)],
    },

    stockExchangeFilingHandlers.updateStockExchangeFiling,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Stock Exchange Filing"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    stockExchangeFilingHandlers.getStockExchangeFilings,
  );

  app.get(
    "/getBySession",
    {
      schema: {
        tags: ["Stock Exchange Filing"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" }, // Optional session parameter
          },
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    stockExchangeFilingHandlers.getBySession,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Stock Exchange Filing"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    stockExchangeFilingHandlers.deleteStockExchangeFilingById,
  );

  app.delete(
    "/:objectId/:id",
    {
      schema: {
        tags: ["Stock Exchange Filing"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    stockExchangeFilingHandlers.deleteItemStockExchangeFilingById,
  );
}
