import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const MAX_FEEDBACK_CHARS = 1000;

const contactSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(3, "Fullname must be at least 3 characters long")
    .max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  email: z.string().trim().email().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  token: z.string().trim().min(1, "Captcha token is required"),
  telephone: z
    .string()
    .trim()
    .max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  smsOptIn: z.boolean().optional(),
  job: z.string().trim().min(1, "Job title is required").max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  company: z.string().trim().min(1, "Company is required").max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  country: z.string().trim().min(1, "Country is required").max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  message: z.string().trim().min(1, "Message is required").max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  termsCondition: z
    .boolean()
    .refine((value) => value === true, {
      message: "Please confirm and accept the policy terms",
    }),
  emailOptIn: z.boolean().optional(),
  marketingUpdates: z.boolean().optional(),
  sourceType: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
  sourcePage: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
});

function jsonContactSchema(tags: string[]) {
  return {
    tags,
    body: zodToJsonSchema(contactSchema),
    response: {
      200: zodToJsonSchema(contactSchema, { $refStrategy: "none" }),
    },
  };
}

export type ContactType = z.infer<typeof contactSchema>;

export { contactSchema, jsonContactSchema };
