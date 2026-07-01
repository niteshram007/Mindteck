import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { ObjectIdSchema } from "../../utils/schema";

/* ───────────────────────────
   Base Schemas (All required)
   ─────────────────────────── */
export const templateSmartCitySchema = z.object({
  pageId: ObjectIdSchema,
  templateName: z.literal("Smart City"),
  bannerTitle: z.string(),
  bannerDescription: z.string(),
  title: z.string(),
  titleSecondary: z.string(),
  first: z.object({
    contentOne: z.string(),
    contentTwo: z.string(),
    path: z.string(),
  }),
  second: z.object({ content: z.string(), path: z.string() }),
  third: z.object({ content: z.string(), path: z.string() }),
  four: z.object({ content: z.string(), path: z.string() }),
  five: z.object({ content: z.string(), path: z.string() }),
  six: z.object({ content: z.string(), path: z.string() }),
  createdAt: z.coerce.date().optional(),
  updatedAt:z.coerce.date().optional()
});

export type SmartCity = z.infer<typeof templateCreateSchema>

export const templateSmartCitySchemaUpdate = templateSmartCitySchema.partial({pageId:true})
export type SmartCityUpdate = z.infer<typeof templateSmartCitySchemaUpdate>

export const templateItTalentSchema = z.object({
  pageId: ObjectIdSchema,
  templateName: z.literal("It Talent"),
  first: z.object({ content: z.string(), path: z.string() }),
  second: z.object({ content: z.string(), path: z.string() }),
  third: z.object({ content: z.string(), path: z.string() }),
  four: z.object({ content: z.string(), path: z.string() }),
  five: z.object({ content: z.string(), path: z.string() }),
});

export type ItTalent = z.infer<typeof templateItTalentSchema>
export const templateItTalentSchemaUpdate = templateItTalentSchema.partial({pageId:true})
export type ItTalentUpdate = z.infer<typeof templateItTalentSchemaUpdate>

export const templateCsrSchema = z.object({
  pageId: ObjectIdSchema,
  templateName: z.literal("CSR"),
  mainContent: z.string(),
  csr: z
    .array(
      z.object({
        content: z.string(),
        images: z.array(
          z.object({ path: z.string(), title: z.string().optional() })
        ),
      })
    )
    .min(1),
});
export type Csr = z.infer<typeof templateCsrSchema>

export const templateCsrSchemaUpdate = templateCsrSchema.partial({pageId:true})
export type CsrUpdate = z.infer<typeof templateCsrSchemaUpdate>

export const templateWhoWeAreSchema = z.object({
  pageId: ObjectIdSchema,
  templateName: z.literal("WHO_WE_ARE"),
  historyPath: z.string().optional(),
  main: z.string(),
  first: z.object({ content: z.string(), path: z.string() }),
  second: z.object({ content: z.string(), path: z.string() }),
});

export type WhoWeAre = z.infer<typeof templateWhoWeAreSchema>
export const templateWhoWeAreSchemaUpdate = templateWhoWeAreSchema.partial({pageId:true})
export type WhoWeAreUpdate = z.infer<typeof templateWhoWeAreSchemaUpdate>

export const templateEdsSchema = z.object({
  pageId: ObjectIdSchema,
  templateName: z.literal("EDS"),
  bannerTitle: z.string(),
  bannerDescription: z.string(),
  title: z.string(),
  titleSecondary: z.string(),
  one: z.object({
    contentOne: z.string(),
    contentTwo: z.string(),
    path: z.string(),
  }),
  two: z.object({ content: z.string() }),
  three: z.object({
    contentOne: z.string(),
    contentTwo: z.string(),
    path: z.string(),
  }),
  four: z.object({ content: z.string(), path: z.string() }),
  five: z.object({ content: z.string(), path: z.string() }),
  six: z.object({ content: z.string(), path: z.string() }),
  seven: z.object({ content: z.string(), path: z.string() }),
  consultation:z.string(),
});

export type Eds = z.infer<typeof templateEdsSchema>
export const templateEdsSchemaUpdate = templateEdsSchema.partial({pageId:true})
export type EdsUpdate = z.infer<typeof templateEdsSchemaUpdate>



export const templateIotSchema = z.object({
  pageId: ObjectIdSchema,
  templateName: z.literal("IOT"),
  bannerTitle: z.string(),
  bannerDescription: z.string(),
  title: z.string(),
  titleSecondary: z.string(),
  one: z.object({
    contentOne: z.string(),
    contentTwo: z.string(),
    path: z.string(),
  }),
  two: z.object({ content: z.string() }),
  three: z.object({
    content: z.string(),
    path: z.string(),
  }),
  four: z.object({ content: z.string(), path: z.string() }),
  five: z.object({ content: z.string(), path: z.string() }),
  six: z.object({ content: z.string(), path: z.string() }),
  seven: z.object({ content: z.string(), path: z.string() }),
  consultation:z.string(),
});

export type Iot = z.infer<typeof templateIotSchema>
export const templateIotSchemaUpdate = templateIotSchema.partial({pageId:true})
export type IotUpdate = z.infer<typeof templateIotSchemaUpdate>

/* ───────────────────────────
   Create Schema (All required)
   ─────────────────────────── */
const templateCreateSchema = z.discriminatedUnion("templateName", [
  templateSmartCitySchema,
  templateItTalentSchema,
  templateCsrSchema,
  templateWhoWeAreSchema,
  templateEdsSchema,
  templateIotSchema,
]);

/* ───────────────────────────
   Update Schema (Partial)
   ───────────────────────────
   Each template schema is made partial but still keeps `templateName`.
   This allows partial updates while validating structure per template type.
─────────────────────────── */
const templateUpdateSchema = z.discriminatedUnion("templateName", [
  templateSmartCitySchema.partial({ pageId: true }),
  templateItTalentSchema.partial({ pageId: true }),
  templateCsrSchema.partial({ pageId: true }),
  templateWhoWeAreSchema.partial({ pageId: true }),
  templateEdsSchema.partial({ pageId: true }),
  templateIotSchema.partial({pageId: true}),
]);

/* ───────────────────────────
   JSON Schema (for Fastify, etc.)
   ─────────────────────────── */
const JsonTemplateCreateSchema = {
  tags: ["Template"],
  body: zodToJsonSchema(templateCreateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(
      z.object({ message: z.string() }),
      { $refStrategy: "none" }
    ),
  },
};

const JsonTemplateUpdateSchema = {
  tags: ["Template"],
  body: zodToJsonSchema(templateUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(
      z.object({ message: z.string() }),
      { $refStrategy: "none" }
    ),
  },
};

/* ───────────────────────────
   Types
   ─────────────────────────── */
export type TemplateCreateType = z.infer<typeof templateCreateSchema>;
export type TemplateUpdateType = z.infer<typeof templateUpdateSchema>;

export {
  templateCreateSchema,
  templateUpdateSchema,
  JsonTemplateCreateSchema,
  JsonTemplateUpdateSchema,
};
