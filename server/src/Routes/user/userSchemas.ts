import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const roleEnum = z.enum(["Recruiter", "Admin", "SuperAdmin"]);

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  token: z.string().optional(),
  totp: z.string().regex(/^\d{6}$/).optional(),
});
const verifySchema = z.object({
  token: z.string().optional(),
});

const userSchema = loginSchema.extend({
  fullName: z.string().min(3, "FullName must be at least 3 characters long"),
  email: z.string(),
  role: roleEnum,
  isActive: z.boolean().default(true),
  totpSecret: z.string().optional(),
});

const jsonLoginSchema = {
  tags: ["Public"],
  body: zodToJsonSchema(loginSchema),
  response: {
    200: zodToJsonSchema(
      z.object({
        token: z.string(),
        user: z.object({
          fullName: z.string(),
          email: z.string(),
          role: roleEnum,
        }),
      }),
    ),
    400: zodToJsonSchema(
      z.object({
        message: z.string(),
      }),
    ),
    401: zodToJsonSchema(
      z.object({
        message: z.string(),
      }),
    ),
    403: zodToJsonSchema(
      z.object({
        message: z.string(),
      }),
    ),
    500: zodToJsonSchema(
      z.object({
        message: z.string(),
      }),
    ),
  },
};
const jsonVerifySchema = {
  tags: ["Public"],
  body: zodToJsonSchema(verifySchema),
  response: {
    200: zodToJsonSchema(
      z.object({
        message: z.string(),
      }),
    ),
    401: zodToJsonSchema(
      z.object({
        message: z.string(),
      }),
    ),
    500: zodToJsonSchema(
      z.object({
        message: z.string(),
      }),
    ),
  },
};

const JsonUserSchema = {
  tags: ["User"],
  body: zodToJsonSchema(userSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};

export type UserType = z.infer<typeof userSchema>;
export type RoleEnumType = z.infer<typeof roleEnum>;

export { userSchema, verifySchema,JsonUserSchema, roleEnum, loginSchema, jsonLoginSchema, jsonVerifySchema };
