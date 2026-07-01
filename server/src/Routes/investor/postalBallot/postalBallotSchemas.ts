import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { generateRandomId } from "../../../utils/schema";

const quarterSectionSchema = z.object({
  postalName: z.string(),
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
});

const PostalBallotSchema = z.object({
  financialYear: z.coerce.date(),
  isActive: z.boolean().default(true),
  postals: z
    .array(quarterSectionSchema)
    .min(1)
    .transform((items) =>
      items.map((item) => ({
        ...item,
        id: generateRandomId(),
      })),
    ),
});

const PostalBallotUpdateSchema = quarterSectionSchema.extend({ id: z.string() });

const JsonPostalBallotSchema = {
  tags: ["Postal Ballot"],
  body: zodToJsonSchema(PostalBallotSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

const JsonPostalBallotUpdateSchema = {
  tags: ["Postal Ballot"],
  body: zodToJsonSchema(PostalBallotUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type PostalBallotType = z.infer<typeof PostalBallotSchema>;
export type PostalBallotUpdateType = z.infer<typeof PostalBallotUpdateSchema>;

export {
  JsonPostalBallotSchema,
  PostalBallotSchema,
  quarterSectionSchema,
  JsonPostalBallotUpdateSchema,
  PostalBallotUpdateSchema,
};
