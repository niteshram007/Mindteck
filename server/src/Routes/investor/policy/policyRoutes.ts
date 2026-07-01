import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { policyHandlers } from "./policyHandlers";
import { JsonPolicySchema, PolicySchema } from "./policySchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function policyRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Policy"]), preHandler:authorize(["SuperAdmin"]) }, policyHandlers.uploadImage);

  app.post(
    "/create",
    {
      schema: JsonPolicySchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PolicySchema)],
    },

    policyHandlers.createPolicy,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonPolicySchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PolicySchema)],
    },

    policyHandlers.updatePolicy,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Policy"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    policyHandlers.getPolicies,
  );

  app.get(
    "/getallActive",
    {
      schema: {
        tags: ["Policy"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    policyHandlers.getActivePolicies,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Policy"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    policyHandlers.deletePolicyById,
  );
}
