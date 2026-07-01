import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { buyBackHandlers } from "./buyBackHandlers";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { BuyBackDailyReportSchema, BuyBackGeneralUpdateSchema,  dailyReportUpdateSchema,  generalUpdateSchema, JsonBuyBackDailyReportSchema, JsonBuyBackDailyReportUpdateSchema, JsonBuyBackGeneralUpdateSchema, JsonBuyBackGeneralUpdateUpdateSchema } from "./buyBackSchemas";
import { authorize } from "../../../Middleware/authorize.middleware";

export function buyBackRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Buy Back"]) }, buyBackHandlers.uploadImage);

  app.post(
    "/create/dailyReports",
    {
      schema: JsonBuyBackDailyReportSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(BuyBackDailyReportSchema)],
    },

    buyBackHandlers.createDailyReportsBuyBack,
  );

  app.post(
    "/create/generalUpdate",
    {
      schema: JsonBuyBackGeneralUpdateSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(BuyBackGeneralUpdateSchema)],
    },

    buyBackHandlers.createGeneralUpdateBuyBack,
  );

  app.put(
    "/update/dailyReports",
    {
      schema: JsonBuyBackDailyReportUpdateSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(dailyReportUpdateSchema)],
    },

    buyBackHandlers.updateDailyReportsBuyBack,
  );

  app.put(
    "/update/generalUpdate",
    {
      schema: JsonBuyBackGeneralUpdateUpdateSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(generalUpdateSchema)],
    },

    buyBackHandlers.updateGeneralUpdateBuyBack,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Buy Back"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    buyBackHandlers.getBuyBacks,
  );

  app.get(
    "/getByYear",
    {
      schema: {
        tags: ["Buy Back"],
        querystring: {
          type: "object",
          properties: {
            year: { type: "string" },
          },
        },
        preHandler: authorize(["SuperAdmin"])
      },
    },
    buyBackHandlers.getBuyBacksByYear,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Buy Back"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    buyBackHandlers.deleteBuyBackById,
  );

  app.delete(
    "/dailyUpdates/:objectId/:month/:date",
    {
      schema: {
        tags: ["Buy Back"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    buyBackHandlers.deleteDailyUpdatedBuyBackByDate,
  );

  app.delete(
    "/generalUpdates/:objectId/:id",
    {
      schema: {
        tags: ["Buy Back"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    buyBackHandlers.deleteGeneralUpdatedBuyBackById,
  );
}
