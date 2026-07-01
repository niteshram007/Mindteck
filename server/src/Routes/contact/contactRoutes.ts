import { FastifyInstance } from "fastify";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
//Locals
import { contactHandlers } from "./contactHandlers";
import { authorize } from "../../Middleware/authorize.middleware";

export function contactRoutes(app: FastifyInstance) {
  app.get(
    "/getall",
    {
      schema: {
        tags: ["Contact"],
      },
      preHandler:authorize(["SuperAdmin"])
    },
    contactHandlers.getContacts,
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["Contact"],
      },
      preHandler:authorize(["SuperAdmin"])
    },
    contactHandlers.getContactById,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Contact"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler:authorize(["SuperAdmin"])
    },
    contactHandlers.deleteContact,
  );

  app.delete(
    "/bulkDelete",
    {
      schema: {
        tags: ["Contact"],
        body: zodToJsonSchema(z.object({ ids: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")) })),
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler:authorize(["SuperAdmin"])
    },
    contactHandlers.deleteBulkContact,
  );
}
