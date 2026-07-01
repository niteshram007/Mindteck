import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
// Locals
import { resourceCategoryHandlers } from "./resourceCategoryHandlers";
import { validate } from "../../Middleware/validation.middleware";
import {
  ResourceCategorySchema,
  JsonResourceCategorySchema,
} from "./resourceCategorySchemas";

export function resourceCategoryRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    {
      schema: JsonResourceCategorySchema,
      preHandler: [validate(ResourceCategorySchema)],
    },

    resourceCategoryHandlers.createResourceCategory,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonResourceCategorySchema,
      preHandler: [validate(ResourceCategorySchema)],
    },

    resourceCategoryHandlers.updateResourceCategory,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Resource Category"],
      },
    },
    resourceCategoryHandlers.getResourceCategories,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Resource Category"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
    },

    resourceCategoryHandlers.deleteResourceCategoryById,
  );
}
