import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { generateRandomId } from "../../../utils/schema";

const fileSchema = z.object({
  filePath: z.string(),
  mimetype: z.string(),
});

const generalUpdateSectionSchema = z.object({
  title: z.string().min(1),
  id: z.string(),
  file: fileSchema,
});

const dailyReportSectionSchema = z.object({
  date: z.string(),
  file: fileSchema,
});

const dailyReportUpdateSchema = z.object({
  year: z.number().min(1900).max(2100),
  month: z.string(),
  date: z.string(),
  file: fileSchema,
});

const generalUpdateSchema = z.object({
  year: z.number().min(1900).max(2100),
  title: z.string().min(1),
  id: z.string(),
  file: fileSchema,
});

const monthlyReportsSchema = z.record(z.string(), z.array(dailyReportSectionSchema));

const BuyBackSchema = z.object({
  year: z.number().min(1900).max(2100),
  generalUpdated: z.array(generalUpdateSectionSchema),
  dailyReports: monthlyReportsSchema,
});

const BuyBackDailyReportSchema = z.object({
  year: z.number().min(1900).max(2100),
  month: z.string(),
  dates: z.array(dailyReportSectionSchema),
});

const BuyBackGeneralUpdateSchema = z.object({
  year: z.number().min(1900).max(2100),
  generalUpdated: z
    .array(generalUpdateSectionSchema.omit({ id: true }))
    .transform((items) => items.map((item) => ({ ...item, id: generateRandomId() }))),
});

const JsonBuyBackDailyReportSchema = {
  tags: ["Buy Back"],
  body: zodToJsonSchema(BuyBackDailyReportSchema, { $refStrategy: "none" }),
  response: {
    201: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonBuyBackGeneralUpdateSchema = {
  tags: ["Buy Back"],
  body: zodToJsonSchema(BuyBackGeneralUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonBuyBackDailyReportUpdateSchema = {
  tags: ["Buy Back"],
  body: zodToJsonSchema(dailyReportUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonBuyBackGeneralUpdateUpdateSchema = {
  tags: ["Buy Back"],
  body: zodToJsonSchema(generalUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type BuyBackType = z.infer<typeof BuyBackSchema>;
export type BuyBackDailyReportType = z.infer<typeof BuyBackDailyReportSchema>;
export type BuyBackGeneralUpdateType = z.infer<typeof BuyBackGeneralUpdateSchema>;
//
export type BuyBackDailyReportUpdateType = z.infer<typeof dailyReportUpdateSchema>;
export type BuyBackGeneralUpdateUpdateType = z.infer<typeof generalUpdateSchema>;

export {
  JsonBuyBackDailyReportSchema,
  JsonBuyBackGeneralUpdateSchema,
  BuyBackDailyReportSchema,
  BuyBackGeneralUpdateSchema,
  JsonBuyBackGeneralUpdateUpdateSchema,
  JsonBuyBackDailyReportUpdateSchema,
  dailyReportUpdateSchema,
  generalUpdateSchema,
};
