import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const quarterEnum = z.enum(["First Quarter", "Second Quarter", "Third Quarter", "Fourth Quarter"]);

const quarterSectionSchema = z.object({
  quarterName: quarterEnum,
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
});

const ShareHoldingPatternSchema = z.object({
  quarters:z.array(quarterSectionSchema),
  financialYear: z.string().regex(/^\d{4}-\d{4}$/, "Invalid financial year format"),
  isActive: z.boolean().default(true),
});

const JsonShareHoldingPatternSchema = {
  tags: ["Share Holding Pattern"],
  body: zodToJsonSchema(ShareHoldingPatternSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonShareHoldingUpdatePatternSchema = {
  tags: ["Share Holding Pattern"],
  body: zodToJsonSchema(quarterSectionSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type ShareHoldingPatternQuarterType = z.infer<typeof quarterSectionSchema>;
export type ShareHoldingPatternType = z.infer<typeof ShareHoldingPatternSchema>;
export type ShareHoldingPatternQuarterEnumType = z.infer<typeof quarterEnum>;

export { JsonShareHoldingPatternSchema, ShareHoldingPatternSchema, quarterSectionSchema,JsonShareHoldingUpdatePatternSchema };
