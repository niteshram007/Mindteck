import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const typeEnum = z.enum([
  "CSR Projects",
  'Saksham Niveshak',
  "Annual Secretarial Compliance Report",
  "Investor Downloads",
  "Disclosures of Related Party Transactions",
  "AGM Transcript",
  "Unclaimed-Unpaid Dividend",
  "Voting Results",
  "Annual Return",
  "Transfer of equity shares to IEPF"
]);

const PdfWithTitleSchema = z.object({
  type: typeEnum,
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
  title: z.string(),
  financialYear: z.string().regex(/^\d{4}-\d{4}$/, "Invalid financial year format").optional(),
  isActive: z.boolean().default(true),
});

const JsonPdfWithTitleSchema = {
  tags: ["PDF With Title"],
  body: zodToJsonSchema(PdfWithTitleSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type PdfWithTitleType = z.infer<typeof PdfWithTitleSchema>;
export type pdfTitleType = z.infer<typeof typeEnum>

export { JsonPdfWithTitleSchema, PdfWithTitleSchema };
