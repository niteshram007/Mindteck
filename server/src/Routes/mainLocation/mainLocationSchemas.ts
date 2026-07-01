import { ObjectId } from "mongodb";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const MainLocationSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string().min(3).max(30),
  isActive: z.boolean().default(true),
});

const JsonMainLocationSchema = {
  tags: ["Main Location"],
  body: zodToJsonSchema(MainLocationSchema.omit({ _id: true }), { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type MainLocationType = z.infer<typeof MainLocationSchema>;

// Zod schema for serialized responses
const MainResponseSchema = MainLocationSchema.extend({
  _id: z.string().optional(),
});

export { MainResponseSchema, JsonMainLocationSchema, MainLocationSchema };
