import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { ObjectIdSchema } from "../../utils/schema";

const PageBaseSchema = z.object({
  url: z.string(),
  title: z.string().min(3),
  templateName: z.string().min(3),
  bannerOrSlider: z.enum(["slider", "banner"]).optional(),
  metaTitle: z.string().min(3).optional(),
  metaKeyword: z.string().min(3).optional(),
  metaDescription: z.string().min(3).optional(),
  canonical: z.string().min(3),
  sliderId: ObjectIdSchema.optional(),
  isActive: z.boolean().default(true),
  file: z
    .object({
      filePath: z.string(),
      mimetype: z.string(),
    })
    .optional(),
});

const PageSchema = PageBaseSchema.refine(
  (data) => {
    // Make sliderId required if bannerOrSlider is "slider"
    if (data.bannerOrSlider === "slider" && !data.sliderId) {
      return false;
    }
    return true;
  },
  {
    message: "sliderId is required when bannerOrSlider is \"slider\"",
  },
).refine(
  (data) => {
    // Make file required if bannerOrSlider is "banner"
    if (data.bannerOrSlider === "banner" && !data.file) {
      return false;
    }
    return true;
  },
  {
    message: "File is required when bannerOrSlider is \"banner\"",
  },
);

const JsonPageSchema = {
  tags: ["Page"],
  body: zodToJsonSchema(PageSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

export type PageType = z.infer<typeof PageSchema>;

// Zod schema for serialized responses
const PageResponseSchema = PageBaseSchema.extend({
  _id: z.string().optional(),
});

export { PageResponseSchema, PageSchema, JsonPageSchema };
