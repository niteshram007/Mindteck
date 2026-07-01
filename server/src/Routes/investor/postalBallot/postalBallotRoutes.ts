import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { PostalBallotHandlers } from "./postalBallotHandlers";
import { JsonPostalBallotSchema, JsonPostalBallotUpdateSchema, PostalBallotSchema, PostalBallotUpdateSchema,  } from "./postalBallotSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function postalBallotRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Postal Ballot"]), preHandler:authorize(["SuperAdmin"]) }, PostalBallotHandlers.uploadImage);
  app.post(
    "/create",
    {
      schema: JsonPostalBallotSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PostalBallotSchema)],
    },

    PostalBallotHandlers.createPostalBallot,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonPostalBallotUpdateSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PostalBallotUpdateSchema)],
    },

    PostalBallotHandlers.updatePostalBallot,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Postal Ballot"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    PostalBallotHandlers.getPostalBallot,
  );

  app.get(
    "/getallActive",
    {
      schema: {
        tags: ["Postal Ballot"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    PostalBallotHandlers.getActivePostalBallot,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Postal Ballot"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    PostalBallotHandlers.deletePostalBallotById,
  );

  app.delete(
    "/:objectId/:id",
    {
      schema: {
        tags: ["Postal Ballot"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    PostalBallotHandlers.deleteItemPostalBallotById,
  );
}
