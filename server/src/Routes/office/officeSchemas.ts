import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { ObjectIdSchema } from "../../utils/schema";

const OfficeSchema = z.object({
  mainLocationId: ObjectIdSchema,
  name: z.string().min(3),
  address1: z.string().min(3),
  address2: z.string().min(3),
  address3: z.string().optional(),
  address4: z.string().optional(),
  address5: z.string().optional(),
  phone: z.string().min(3).optional(),
  fax: z.string().optional(),
  isActive: z.boolean().default(true),
  mapLocationAddress: z.string().optional(),
  officeDetailHeading: z.string().optional(),
  officeDetailDescription: z.string().optional(),
  file: z
    .object({
      filePath: z.string(),
      mimetype: z.string(),
    })
    .optional(),
});

const JsonOfficeSchema = {
  tags: ["Office"],
  body: zodToJsonSchema(OfficeSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

export type OfficeType = z.infer<typeof OfficeSchema>;

const OfficeResponseSchema = OfficeSchema.extend({
  _id: z.string().optional(),
});

export { OfficeResponseSchema, OfficeSchema, JsonOfficeSchema };
