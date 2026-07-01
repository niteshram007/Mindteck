import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { CommitteeHandlers } from "./committeeHandlers";
import { JsonCommitteeSchema, CommitteeSchema } from "./committeeSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { authorize } from "../../../Middleware/authorize.middleware";

export function committeeRoutes(app: FastifyInstance) {

  app.post(
    "/create",
    {
      schema: JsonCommitteeSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(CommitteeSchema)],
    },

    CommitteeHandlers.createCommittee,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonCommitteeSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(CommitteeSchema)],
    },

    CommitteeHandlers.updateCommittee,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Committee"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    CommitteeHandlers.getCommittees,
  );

  app.get(
    "/getallGrouped",
    {
      schema: {
        tags: ["Committee"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    CommitteeHandlers.getCommitteeGrouped,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Committee"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    CommitteeHandlers.deleteCommitteeById,
  );
}
