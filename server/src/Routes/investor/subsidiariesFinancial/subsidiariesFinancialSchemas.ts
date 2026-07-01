import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { generateRandomId } from "../../../utils/schema";


const SubsidiariesSectionSchema = z.object({
  subsidiary: z.string(),
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
});

const SubsidiariesFinancialSchema = z.object({
  subsidiaries:z.array(SubsidiariesSectionSchema).transform((items) =>
    items.map((item) => ({
      ...item,
      id: generateRandomId(),
    })),
  ),
  financialYear: z.string().regex(/^\d{4}-\d{4}$/, "Invalid financial year format"),
  isActive: z.boolean().default(true),
});

const SubsidiariesFinancialUpdateSchema =  SubsidiariesSectionSchema.extend({id:z.string()});

const JsonSubsidiariesFinancialSchema = {
  tags: ["Subsidiaries Financial"],
  body: zodToJsonSchema(SubsidiariesFinancialSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonShareHoldingUpdatePatternSchema = {
  tags: ["Subsidiaries Financial"],
  body: zodToJsonSchema(SubsidiariesFinancialUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type SubsidiariesFinancialType = z.infer<typeof SubsidiariesFinancialSchema>;
export type SubsidiariesFinancialUpdateType = z.infer<typeof SubsidiariesFinancialUpdateSchema>;

export { JsonSubsidiariesFinancialSchema, SubsidiariesFinancialSchema, SubsidiariesFinancialUpdateSchema,JsonShareHoldingUpdatePatternSchema };
