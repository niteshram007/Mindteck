import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { MenuPositions } from "../../constants";
import { ObjectIdSchema } from "../../utils/schema";

const MenuItemBaseSchema = z.object({
  position: z.string(),
  label: z.string(),
  url: z.string(),
  parent: z.union([z.string(), z.null()]),
  order: z.number(),
  isActive: z.boolean().default(true),
});

const MenuItemSchema = MenuItemBaseSchema.extend({
  children: z.array(MenuItemBaseSchema).optional(),
});

const positionEnum = z.enum(MenuPositions);

const MenuSchema = z.object({
  position: positionEnum,
  label: z.string(),
  parent: z.union([ObjectIdSchema, z.null()]),
  url: z.string().optional(),
  order: z.number().default(1),
});

const JsonMenuSchema = {
  tags: ["Menu"],
  body: zodToJsonSchema(MenuSchema, { $refStrategy: "root" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type MenuType = z.infer<typeof MenuSchema>;
export type PositionEnumType = z.infer<typeof positionEnum>;
export type MenuItemType = z.infer<typeof MenuItemSchema>;

// Zod schema for serialized responses
const MenuResponseSchema = MenuItemSchema.extend({
  parent: z.string().optional(),
  _id: z.string(),
});

const MenuResponsePositionSchema = MenuSchema.extend({
  parent: z.string().optional(),
  _id: z.string(),
});

export { MenuResponseSchema, MenuResponsePositionSchema, MenuSchema, JsonMenuSchema, positionEnum, MenuItemSchema };
