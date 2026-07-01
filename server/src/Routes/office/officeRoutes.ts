import { officeHandlers } from "./officeHandlers";
import { JsonOfficeSchema, OfficeSchema } from "./officeSchemas";
import { FastifyInstance } from "fastify";
import { validate } from "../../Middleware/validation.middleware";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
import { uploadSchema } from "../../utils/schema";
import { authorize } from "../../Middleware/authorize.middleware";

export function officeRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Office"]), preHandler:authorize(["SuperAdmin"]) }, officeHandlers.uploadImage);

  // Route: Create Office
  app.post(
    "/create",
    {
      schema: JsonOfficeSchema,
      preHandler: [authorize(["SuperAdmin"]), validate(OfficeSchema)],
    },

    officeHandlers.createOffice,
  );

  // Route: Update Office
  app.put(
    "/update/:id",
    {
      schema: JsonOfficeSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(OfficeSchema)],
    },

    officeHandlers.updateOffice,
  );

  // Route: Get All Office
  app.get(
    "/getall",
    {
      schema: {
        tags: ["Office"],
      },
      preHandler:authorize(["SuperAdmin"])
    },
    officeHandlers.getOffices,
  );

  //ROute: Get All Office by category
  app.get(
    "/getall/:locationId",
    {
      schema: {
        tags: ["Office"],
      },
      preHandler:authorize(["SuperAdmin"])
    },

    officeHandlers.getOfficesByMainLocation,
  );
  app.get(
    "/getallActive/:locationId",
    {
      schema: {
        tags: ["Office"],
      },
      preHandler:authorize(["SuperAdmin"])
    },

    officeHandlers.getActiveOfficesByMainLocation,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Office"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler:authorize(["SuperAdmin"])
    },

    officeHandlers.deleteOfficeById,
  );
}
