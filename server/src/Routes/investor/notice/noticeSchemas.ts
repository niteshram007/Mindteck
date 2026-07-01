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

const NoticeSchema = z.object({
  financialYear: z.string().regex(/^\d{4}-\d{4}$/, "Invalid financial year format"),
  heading:z.string(),
  notices: z.array(ReportSectionSchema).min(1).transform((items) =>
    items.map((item) => ({
      ...item,
      id: generateRandomId(),
    })),
  ),
});

const NoticeUpdateSchema = ReportSectionSchema.extend({id:z.string()});

const JsonNoticeSchema = {
  tags: ["Notice"],
  body: zodToJsonSchema(NoticeSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonNoticeUpdateSchema = {
  tags: ["Notice"],
  body: zodToJsonSchema(NoticeUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type NoticeType = z.infer<typeof NoticeSchema>;
export type NoticeUpdateType = z.infer<typeof NoticeUpdateSchema>;

export { JsonNoticeSchema, NoticeSchema, JsonNoticeUpdateSchema, NoticeUpdateSchema };
