import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const ResourceCategorySchema = z.object({
  title: z.string().min(1),
  subTitle: z.string().optional(),
  order: z.number().default(1),
  isActive: z.boolean().default(true),
});

const JsonResourceCategorySchema = {
  tags: ["Resource Category"],
  body: zodToJsonSchema(ResourceCategorySchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

export type ResourceCategoryType = z.infer<typeof ResourceCategorySchema>;

// Zod schema for serialized responses
const ResourceCategoryResponseSchema = ResourceCategorySchema.extend({
  _id: z.string().optional(),
});

export {
  ResourceCategorySchema,
  JsonResourceCategorySchema,
  ResourceCategoryResponseSchema,
};
