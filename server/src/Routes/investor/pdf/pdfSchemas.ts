import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const typeEnum = z.enum([
  "Disclosures pursuant to SEBI (Share Based Employee Benefits and Sweat Equity) Regulations, 2021",
  "Disclosures pursuant to sebi (sbeb) regulations 2021",
  "Independent Directors Familiarisation Programme",
  "ID familiarisation programme",
  "Letter of Appointment for Independent Directors",
  "Procedure for Dematerialisation of Shares",
  "Ind AS Convergence",
  "FAQs on TDS",
]);

const PdfSchema = z.object({
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
  type: typeEnum,
  title: z.string().trim().min(1).optional(),
  isActive: z.boolean().default(true),
});

const JsonPdfSchema = {
  tags: ["PDF"],
  body: zodToJsonSchema(PdfSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type PdfType = z.infer<typeof PdfSchema>;

export { JsonPdfSchema, PdfSchema };
