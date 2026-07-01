  import { z } from "zod";
  import zodToJsonSchema from "zod-to-json-schema";

  const PartnerAndAllianceSchema = z.object({
    // category: z.enum(["Partners and Alliance"]), // Not required
    content: z.string().optional(),
    order: z.number().default(1),
    isActive: z.boolean().default(true),
    file: z.object({
      filePath: z.string(),
      mimetype: z.string(),
    }),
  });

  const JsonPartnerAndAllianceSchema = {
    tags: ["Partner And Alliance"],
    body: zodToJsonSchema(PartnerAndAllianceSchema, { $refStrategy: "none" }),
    response: {
      200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
    },
  };

  export type PartnerAndAllianceType = z.infer<typeof PartnerAndAllianceSchema>;

  // Zod schema for serialized responses
  const PartnerAndAllianceResponseSchema = PartnerAndAllianceSchema.extend({
    _id: z.string().optional(),
  });

  export { PartnerAndAllianceResponseSchema, PartnerAndAllianceSchema, JsonPartnerAndAllianceSchema };
