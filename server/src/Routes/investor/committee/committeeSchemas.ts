import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const CommitteeTypeEnum = z.enum([
  "Audit Committee",
  "Stakeholders Relationship Committee",
  "Nomination and Remuneration Committee",
  "Corporate Social Responsibility Committee",
]);

const CommitteeSchema = z.object({
  committeeType: CommitteeTypeEnum,
  name: z.string().min(3).max(30),
  designation: z.string(),
  position: z.string(),
  isActive: z.boolean().default(true),
});

const JsonCommitteeSchema = {
  tags: ["Committee"],
  body: zodToJsonSchema(CommitteeSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type CommitteeType = z.infer<typeof CommitteeSchema>;

export { JsonCommitteeSchema, CommitteeSchema };
