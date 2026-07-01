import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { generateRandomId } from "../../utils/schema";


const SliderSchemaItems = z.object({
  order: z.number(),
  altText: z.string().min(3),
  content: z.string().min(3).optional(),
  description: z.string().min(3).optional(),
  redirectCategory: z.enum(["industries", "services", "solutions"]).optional(),
  redirectPath: z.string().max(500).optional(),
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
});

const SliderSchema = z.object({
  title: z.string().min(3),
  items: z
    .array(SliderSchemaItems)
    .min(1)
    .transform((items) =>
      items.map((item) => ({
        ...item,
        id: generateRandomId(),
      })),
    ),
});

const JsonSliderSchema = {
  tags: ["Slider"],
  body: zodToJsonSchema(SliderSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

const SliderSchemaUpdateItems = z.object({
  order: z.number(),
  id: z.string().optional(),
  altText: z.string().min(3),
  content: z.string().min(3).optional(),
  description: z.string().min(3).optional(),
  redirectCategory: z.enum(["industries", "services", "solutions"]).optional(),
  redirectPath: z.string().max(500).optional(),
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
});

const SliderSchemaUpdate = z.object({
  title: z.string().min(3),
  items: z.array(SliderSchemaUpdateItems).min(1),
});

const JsonSliderUpdateSchema = {
  tags: ["Slider"],
  body: zodToJsonSchema(SliderSchemaUpdate, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

export type SliderType = z.infer<typeof SliderSchema>;
export type SliderUpdateType = z.infer<typeof SliderSchemaUpdate>;

const SliderResponseSchema = SliderSchema.extend({
  _id: z.string().optional(),
});

export { SliderResponseSchema, SliderSchema, JsonSliderSchema, JsonSliderUpdateSchema, SliderSchemaUpdate };
