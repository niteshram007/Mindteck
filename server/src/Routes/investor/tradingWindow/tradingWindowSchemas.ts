import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const tradingWindowSchema = z.object({
  key: z.string().optional(),
  isVisible: z.boolean().default(false),
  openDate: z.string().optional().default(""),
  closeDate: z.string().optional().default(""),
  boardMeetingDate: z.string().optional().default(""),
  updatedAt: z.coerce.date().optional(),
});

const tradingWindowUpsertSchema = tradingWindowSchema.pick({
  isVisible: true,
  openDate: true,
  closeDate: true,
  boardMeetingDate: true,
});

const tradingWindowResponseSchema = z.object({
  message: z.string().optional(),
  data: tradingWindowSchema,
});

const JsonTradingWindowUpsertSchema = {
  tags: ["Trading Window"],
  body: zodToJsonSchema(tradingWindowUpsertSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(tradingWindowResponseSchema, { $refStrategy: "none" }),
  },
};

const JsonTradingWindowGetSchema = {
  tags: ["Trading Window"],
  response: {
    200: zodToJsonSchema(tradingWindowResponseSchema, { $refStrategy: "none" }),
  },
};

export type TradingWindowType = z.infer<typeof tradingWindowSchema>;
export type TradingWindowUpsertType = z.infer<typeof tradingWindowUpsertSchema>;

export {
  tradingWindowSchema,
  tradingWindowUpsertSchema,
  JsonTradingWindowUpsertSchema,
  JsonTradingWindowGetSchema,
};
