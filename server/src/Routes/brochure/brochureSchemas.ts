import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const BrochureSchema = z.object({
  title: z.string().min(1),
  subTitle: z.string().optional(),
  content: z.string(),
  resourceCategoryId: z.string().min(1),
  isActive: z.boolean().default(true),
  file: z
    .object({
      filePath: z.string(),
      mimetype: z.string(),
    })
    .optional(),
});

const JsonBrochureSchema = {
  tags: ["Brochure"],
  body: zodToJsonSchema(BrochureSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

export type BrochureType = z.infer<typeof BrochureSchema>;

// Zod schema for serialized responses
const BrochureResponseSchema = BrochureSchema.extend({
  _id: z.string().optional(),
});

export { BrochureSchema, JsonBrochureSchema, BrochureResponseSchema };
