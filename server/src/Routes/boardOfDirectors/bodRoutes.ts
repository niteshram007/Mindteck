import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
import { FastifyInstance } from "fastify";
//
import { JsonBodSchema, BodSchema, bodArray } from "./bodSchemas";
import { bodHandlers } from "./bodHandlers";
import { validate } from "../../Middleware/validation.middleware";
import { uploadSchema } from "../../utils/schema";
import { authorize } from "../../Middleware/authorize.middleware";

export function bodRoutes(app: FastifyInstance) {
  app.post("/upload/profile", { schema: uploadSchema(["BOD"]) }, bodHandlers.uploadBodImage);
  app.post("/upload/passport", { schema: uploadSchema(["BOD"]) }, bodHandlers.uploadBodImage);

  app.post(
    "/create",
    {
      schema: JsonBodSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(BodSchema)],
    },

    bodHandlers.createBod,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonBodSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(BodSchema)],
    },

    bodHandlers.updateBod,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["BOD"],
        querystring: {
          type: "object",
          properties: {
            category: {
              type: "string",
              enum: bodArray
            },
          },
          required: [],
        },
      },
      preHandler:authorize(["SuperAdmin"])
    },
    bodHandlers.getBodsByCategory,
  );

  app.get(
    "/getallActive",
    {
      schema: {
        tags: ["BOD"],
        querystring: {
          type: "object",
          properties: {
            category: {
              type: "string",
              enum: bodArray
            },
          },
          required: [],
        },
      },
      preHandler:authorize(["SuperAdmin"])
    },
    bodHandlers.getActiveBodsByCategory,
  );
  
  app.get(
    "/getById/:id",
    {
      schema: {
        tags: ["BOD"],
      },
      preHandler:authorize(["SuperAdmin"]),
    },
    bodHandlers.getBodById,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["BOD"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler:authorize(["SuperAdmin"])
    },

    bodHandlers.deleteBodById,
  );
}
