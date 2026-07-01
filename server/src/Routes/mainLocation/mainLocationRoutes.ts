import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { mainLocationHandlers } from "./mainLocationHandlers";
import { JsonMainLocationSchema, MainLocationSchema } from "./mainLocationSchemas";
import { validate } from "../../Middleware/validation.middleware";
import { authorize } from "../../Middleware/authorize.middleware";

export function mainLocationRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    {
      schema: JsonMainLocationSchema,
      preHandler: [authorize(["SuperAdmin"]), validate(MainLocationSchema)],
    },

    mainLocationHandlers.createMainLocation,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonMainLocationSchema,
      preHandler: [authorize(["SuperAdmin"]), validate(MainLocationSchema)],
    },

    mainLocationHandlers.updateMainLocation,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Main Location"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    mainLocationHandlers.getMainLocations,
  );

  app.get(
    "/getallActive",
    {
      schema: {
        tags: ["Main Location"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    mainLocationHandlers.getActiveMainLocations,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Main Location"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    mainLocationHandlers.deleteMainLocationById,
  );
}
