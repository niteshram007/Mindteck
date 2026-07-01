import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const MAX_FEEDBACK_CHARS = 1000;
const ratingEnum = z.enum(["Excellent", "Good", "Satisfactory", "Average", "Poor",""]).optional();

const InvestorFeedbackSchema = z.object({
  firstName: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
  lastName: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
  email: z.string().email("Invalid Email ID").max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  telephone: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
  postalAddress: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
  disclosureOfInformation: ratingEnum,
  clarityAndTransparency: ratingEnum,
  responseTime: ratingEnum,
  timelyInformation: ratingEnum,
  satisfactionWithShareTransferAgent: ratingEnum,
  satisfactionWithInvestorRelations: ratingEnum,
  overallSatisfactionAsInvestor: ratingEnum,
  comments: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
  sourceType: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
  sourcePage: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
});

const JsonInvestorFeedbackSchema = {
  tags: ["Investor Feedback"],
  body: zodToJsonSchema(InvestorFeedbackSchema.extend({ token: z.string() }), { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type InvestorFeedbackType = z.infer<typeof InvestorFeedbackSchema>;

export { JsonInvestorFeedbackSchema, InvestorFeedbackSchema };
