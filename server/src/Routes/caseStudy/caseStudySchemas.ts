import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const CaseStudySchema = z.object({
  title: z.string().min(3),
  category: z.array(z.string()).min(1),
  description: z.string().min(3),
  content: z.string(),
  isActive: z.boolean().default(true),
  file: z
    .object({
      filePath: z.string(),
      mimetype: z.string(),
    })
    .optional(),
});

const JsonCaseStudySchema = {
  tags: ["Case Study"],
  body: zodToJsonSchema(CaseStudySchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

export type CaseStudyType = z.infer<typeof CaseStudySchema>;

// Zod schema for serialized responses
const CaseStudyResponseSchema = CaseStudySchema.extend({
  _id: z.string().optional(),
});

export { CaseStudyResponseSchema, CaseStudySchema, JsonCaseStudySchema };
