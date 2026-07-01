import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
//==================================== Local ============================================
import { validate } from "../../Middleware/validation.middleware";
import { brochureHandlers } from "./brochureHandlers";
import { JsonBrochureSchema, BrochureSchema } from "./brochureSchemas";
import { uploadSchema } from "../../utils/schema";
import { authorize } from "../../Middleware/authorize.middleware";

export function brochureRoutes(app: FastifyInstance) {
  app.post(
    "/upload",
    { schema: uploadSchema(["Brochure"]), preHandler: authorize(["SuperAdmin"]) },
    brochureHandlers.uploadBrochureFile,
  );

  // Route: Create Brochure
  app.post(
    "/create",
    {
      schema: JsonBrochureSchema,
      preHandler: [authorize(["SuperAdmin"]), validate(BrochureSchema)],
    },

    brochureHandlers.createBrochure,
  );

  // Route: Update Brochure
  app.put(
    "/update/:id",
    {
      schema: JsonBrochureSchema,
      preHandler: [authorize(["SuperAdmin"]), validate(BrochureSchema)],
    },

    brochureHandlers.updateBrochure,
  );

  // Route: Get All Brochures
  app.get(
    "/getall",
    {
      schema: {
        tags: ["Brochure"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    brochureHandlers.getBrochures,
  );

  // Route: Get Brochure By Id
  app.get(
    "/getById/:id",
    {
      schema: {
        tags: ["Brochure"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    brochureHandlers.getBrochureById,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Brochure"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    brochureHandlers.deleteBrochureById,
  );
}
