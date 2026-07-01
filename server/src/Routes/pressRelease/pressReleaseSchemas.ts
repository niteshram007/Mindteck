import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
export const pageStatusEnum = z.enum(["Draft", "Published"]);

const pressReleaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  content: z.string().min(1),
  publicationDate: z.coerce.string().date(),
  publicationYear:z.number()
  .int()
  .min(2000, { message: "Publication year must be at least 2000" })
  .max(2999, { message: "Publication year must be at most 2999" }),
  status: pageStatusEnum.default("Draft"),

  // Optional fields
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

const JsonPressReleaseSchema = {
  tags: ["Press Release"],
  body: zodToJsonSchema(pressReleaseSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

export type PressReleaseType = z.infer<typeof pressReleaseSchema>;

export { pressReleaseSchema, JsonPressReleaseSchema };
