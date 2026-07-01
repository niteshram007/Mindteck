import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { investorFeedbackHandlers } from "./investorFeedbackHandlers";
import { JsonInvestorFeedbackSchema, InvestorFeedbackSchema } from "./investorFeedbackSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { authorize } from "../../../Middleware/authorize.middleware";

export function investorFeedbackRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    {
      schema: JsonInvestorFeedbackSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(InvestorFeedbackSchema.extend({token:z.string()}))],
    },
    investorFeedbackHandlers.createInvestorFeedback,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Investor Feedback"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    investorFeedbackHandlers.getInvestorFeedBack,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Investor Feedback"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },
    investorFeedbackHandlers.deleteInvestorFeedbackById,
  );

  app.delete(
    "/bulkDelete",
    {
      schema: {
        tags: ["Investor Feedback"],
        body: zodToJsonSchema(z.object({ ids: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")) })),
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },
    investorFeedbackHandlers.deleteInvestorBulkFeedback,
  );
}
