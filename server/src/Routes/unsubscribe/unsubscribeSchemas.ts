import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const MAX_FEEDBACK_CHARS = 1000;

const unsubscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  token: z.string().trim().min(1, "Captcha token is required"),
  sourcePage: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed").optional(),
});

const jsonUnsubscribeSchema = {
  tags: ["Public"],
  body: zodToJsonSchema(unsubscribeSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(
      z.object({
        message: z.string(),
      }),
      { $refStrategy: "none" },
    ),
  },
};

export type UnsubscribeType = z.infer<typeof unsubscribeSchema>;

export { unsubscribeSchema, jsonUnsubscribeSchema };
