import { pageHandlers } from "./pageHandlers";
import { JsonPageSchema, PageSchema } from "./pageSchemas";
import { FastifyInstance } from "fastify";
import { validate } from "../../Middleware/validation.middleware";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
import {  uploadSchema } from "../../utils/schema";
import { authorize } from "../../Middleware/authorize.middleware";

export function pageRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Page"]), preHandler:authorize(["SuperAdmin"]) }, pageHandlers.uploadImage);
  // Route: Create Page
  app.post(
    "/create",
    {
      schema: JsonPageSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PageSchema)],
    },

    pageHandlers.createPage,
  );

  // Route: Update Page
  app.put(
    "/update/:id",
    {
      schema: JsonPageSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PageSchema)],
    },

    pageHandlers.updatePage,
  );

  app.post(
    "/getTemplateByUrl",
    {
      schema: {
        tags: ["Page"],
        body: {
          type: "object",
          properties: {
            url: { type: "string", minLength: 1, maxLength: 100 },
          },
          required: ["url"],
        },
      },
      preHandler: [authorize(["SuperAdmin"]),validate(z.object({ url: z.string().min(1).max(100) }))],
    },

    pageHandlers.getTemplateByUrl,
  );

  app.post(
    "/getActiveTemplateByUrl",
    {
      schema: {
        tags: ["Page"],
        body: {
          type: "object",
          properties: {
            url: { type: "string", minLength: 1, maxLength: 100 },
          },
          required: ["url"],
        },
      },
      preHandler: [authorize(["SuperAdmin"]),validate(z.object({ url: z.string().min(1).max(100) }))],
    },

    pageHandlers.getActiveTemplateByUrl,
  );

  // Route: Get All Page
  app.get(
    "/getall",
    {
      schema: {
        tags: ["Page"],
      },
      preHandler:authorize(["SuperAdmin"])
    },
    pageHandlers.getPages,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Page"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler:authorize(["SuperAdmin"])
    },

    pageHandlers.deletePageById,
  );
}
