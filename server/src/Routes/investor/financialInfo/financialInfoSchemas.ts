import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { generateRandomId } from "../../../utils/schema";

const ReportSectionSchema = z.object({
  title: z.string().min(1),
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
});

const QuarterSchema = z.object({
  quarter: z.enum(["Q1", "Q2", "Q3", "Q4"]),
  sections: z
    .array(ReportSectionSchema)
    .min(1)
    .transform((items) =>
      items.map((item) => ({
        ...item,
        id: generateRandomId(),
      })),
    ),
});

const FinancialInfoSchema = QuarterSchema.extend({
  financialYear: z.string().regex(/^\d{4}-\d{4}$/, "Invalid financial year format"),
});

const FinancialInfoUpdateSchema = ReportSectionSchema.extend({ id: z.string() });

const JsonFinancialInfoSchema = {
  tags: ["Financial Info"],
  body: zodToJsonSchema(FinancialInfoSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonFinancialInfoUpdateSchema = {
  tags: ["Financial Info"],
  body: zodToJsonSchema(FinancialInfoUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type FinancialInfoType = z.infer<typeof FinancialInfoSchema>;
export type FinancialInfoUpdateType = z.infer<typeof FinancialInfoUpdateSchema>;

export { JsonFinancialInfoSchema, FinancialInfoSchema, FinancialInfoUpdateSchema, JsonFinancialInfoUpdateSchema };
