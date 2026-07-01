import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const jobCategorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(100, "Category name is too long"),
  description: z.string().min(10, "Category description should be at least 10 characters long"),
  isActive: z.boolean().default(true),
});

const JsonJobCategorySchema = {
  tags: ["Job Category"],
  body: zodToJsonSchema(jobCategorySchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

// Define the main job schema with dynamic validation
export type JobCategoryType = z.infer<typeof jobCategorySchema>;

export { jobCategorySchema, JsonJobCategorySchema };
