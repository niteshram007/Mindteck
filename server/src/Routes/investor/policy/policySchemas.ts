import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const PolicySchema = z.object({
  title: z.string().min(3).max(100),
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
  image: z
    .object({
      filePath: z.string(),
      mimetype: z.string(),
    })
    .optional(),
  isActive: z.boolean().default(true),
});

const JsonPolicySchema = {
  tags: ["Policy"],
  body: zodToJsonSchema(PolicySchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type PolicyType = z.infer<typeof PolicySchema>;

export { JsonPolicySchema, PolicySchema };
