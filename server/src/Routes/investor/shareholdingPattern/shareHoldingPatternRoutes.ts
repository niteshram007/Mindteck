import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { ShareHoldingPatternHandlers } from "./shareHoldingPatternHandlers";
import { JsonShareHoldingPatternSchema, JsonShareHoldingUpdatePatternSchema, quarterSectionSchema, ShareHoldingPatternSchema } from "./shareHoldingPatternSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function shareHoldingPatternRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Share Holding Pattern"]), preHandler:authorize(["SuperAdmin"]) }, ShareHoldingPatternHandlers.uploadImage);
  app.post(
    "/create",
    {
      schema: JsonShareHoldingPatternSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(ShareHoldingPatternSchema)],
    },

    ShareHoldingPatternHandlers.createShareHoldingPattern,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonShareHoldingUpdatePatternSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(quarterSectionSchema)],
    },

    ShareHoldingPatternHandlers.updateShareHoldingPattern,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Share Holding Pattern"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    ShareHoldingPatternHandlers.getShareHoldingPattern,
  );

  app.get(
    "/getallBySession",
    {
      schema: {
        tags: ["Share Holding Pattern"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" }, // Optional session parameter
          },
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    ShareHoldingPatternHandlers.getBySessionShareHoldingPattern,
  );


  app.get(
    "/getallActive",
    {
      schema: {
        tags: ["Share Holding Pattern"],
      },
    },
    ShareHoldingPatternHandlers.getActiveShareHoldingPattern,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Share Holding Pattern"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    ShareHoldingPatternHandlers.deleteShareHoldingPatternById,
  );

  app.delete(
    "/:objectId/:quarterName",
    {
      schema: {
        tags: ["Share Holding Pattern"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    ShareHoldingPatternHandlers.deleteItemShareHoldingPatternById,
  );
}
