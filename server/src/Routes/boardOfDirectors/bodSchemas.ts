import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
export const bodArray = ["Board of Director", "Management Team", "Practice Team", "Sales Team"] as const;
export const categoryEnum = z.enum(bodArray);

const BodSchema = z.object({
  fullName: z.string().min(3),
  category:  z.array(categoryEnum.default("Board of Director")),
  designation: z.string().min(3),
  description: z.string().optional().default(""),
  content: z.string().min(3),
  displayOrder: z.coerce.number().int().min(1).default(9999),
  isActive: z.boolean().default(true),
  passportImage: z
    .object({
      filePath: z.string(),
      mimetype: z.string(),
    })
    .optional(),
  profileImage: z
    .object({
      filePath: z.string(),
      mimetype: z.string(),
    })
    .optional(),
});

const JsonBodSchema = {
  tags: ["BOD"],
  body: zodToJsonSchema(BodSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

export type BodType = z.infer<typeof BodSchema>;
export type BodCategoryType = z.infer<typeof categoryEnum>;

const BodResponseSchema = BodSchema.extend({
  _id: z.string().optional(),
});

export { BodResponseSchema, BodSchema, JsonBodSchema };
