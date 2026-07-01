import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
//Locals
import { jobCategoryHandlers } from "./jobCategoryHandlers";
import { validate } from "../../../Middleware/validation.middleware";
import { jobCategorySchema, JsonJobCategorySchema } from "./jobCategorySchemas";

export function jobCategoryRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    {
      schema: JsonJobCategorySchema,
      preHandler: [validate(jobCategorySchema)],
    },

    jobCategoryHandlers.createJobCategory,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonJobCategorySchema,
      preHandler: [validate(jobCategorySchema)],
    },

    jobCategoryHandlers.updateJobCategory,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Job Category"],
      },
    },
    jobCategoryHandlers.getJobCategories,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Job Category"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
    },

    jobCategoryHandlers.deleteJobCategoryById,
  );
}
