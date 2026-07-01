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

const AnnualReportSchema = z.object({
  financialYear: z.string().regex(/^\d{4}-\d{4}$/, "Invalid financial year format"),
  sections: z.array(ReportSectionSchema).min(1)
    .transform((items) =>
      items.map((item) => ({
        ...item,
        id: generateRandomId(),
      })),
    ),
});

const AnnualReportUpdateSchema = ReportSectionSchema.extend({id:z.string()});

const JsonAnnualReportSchema = {
  tags: ["Annual Report"],
  body: zodToJsonSchema(AnnualReportSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonAnnualReportUpdateSchema = {
  tags: ["Annual Report"],
  body: zodToJsonSchema(AnnualReportUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type AnnualReportType = z.infer<typeof AnnualReportSchema>;
export type AnnualReportUpdateType = z.infer<typeof AnnualReportUpdateSchema>;

export { JsonAnnualReportSchema, AnnualReportSchema, JsonAnnualReportUpdateSchema, AnnualReportUpdateSchema };
