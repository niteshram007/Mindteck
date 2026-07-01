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

const StockExchangeFilingSchema = z.object({
  financialYear: z.string().regex(/^\d{4}-\d{4}$/, "Invalid financial year format"),
  stockExchangeFilings: z.array(ReportSectionSchema).min(1).transform((items) =>
    items.map((item) => ({
      ...item,
      id: generateRandomId(),
    })),
  ),
});

const StockExchangeFilingUpdateSchema = ReportSectionSchema.extend({id:z.string()});

const JsonStockExchangeFilingSchema = {
  tags: ["Stock Exchange Filing"],
  body: zodToJsonSchema(StockExchangeFilingSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonStockExchangeFilingUpdateSchema = {
  tags: ["Stock Exchange Filing"],
  body: zodToJsonSchema(StockExchangeFilingUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type StockExchangeFilingType = z.infer<typeof StockExchangeFilingSchema>;
export type StockExchangeFilingUpdateType = z.infer<typeof StockExchangeFilingUpdateSchema>;

export { JsonStockExchangeFilingSchema, StockExchangeFilingSchema, JsonStockExchangeFilingUpdateSchema, StockExchangeFilingUpdateSchema};
