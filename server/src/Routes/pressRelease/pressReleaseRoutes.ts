import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
import { FastifyInstance } from "fastify";
//
import { JsonPressReleaseSchema, pressReleaseSchema } from "./pressReleaseSchemas";
import { pressReleaseHandlers } from "./pressReleaseHandlers";
import { validate } from "../../Middleware/validation.middleware";
import { authorize } from "../../Middleware/authorize.middleware";

export function pressReleaseRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    {
      schema: JsonPressReleaseSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(pressReleaseSchema)],
    },

    pressReleaseHandlers.createPressRelease,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonPressReleaseSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(pressReleaseSchema)],
    },

    pressReleaseHandlers.updatePressRelease,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Press Release"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    pressReleaseHandlers.getPressReleases,
  );

  app.get(
    "/getallPublished",
    {
      schema: {
        tags: ["Press Release"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    pressReleaseHandlers.getPublishedPressRelease,
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["Press Release"],
      },
      preHandler: authorize(["SuperAdmin"])
    },

    pressReleaseHandlers.getPressReleaseById,
  );

  app.get(
    "/getByTitle/:title",
    {
      schema: {
        tags: ["Press Release"],
      },
      preHandler: authorize(["SuperAdmin"])
    },

    pressReleaseHandlers.getPressReleaseByTitle,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Press Release"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    pressReleaseHandlers.deletePressReleaseById,
  );
}
