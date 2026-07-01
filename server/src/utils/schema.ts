import { ObjectId } from "mongodb";
import { randomBytes } from "node:crypto";
import { z } from "zod";

export const ObjectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId") // Ensure it's a valid 24-character hex string
  .transform((value) => new ObjectId(value));

// Example of a parameter schema for route params (MongoDB ObjectId validation)
export const paramsSchema = z.object({
  url: z.string().regex(/^[a-fA-F0-9]{24}$/, {
    message: "Invalid ObjectId",
  }), // MongoDB ObjectId validation
});

export function uploadSchema(tags: string[]) {
  return {
    tags,
    consumes: ["multipart/form-data"],
    // body: {
    //   type: "object",
    //   properties: {
    //     file:{
    //       type: "string",
    //       format: "binary",
    //     },
    //   },
    //   required: ["file"], // The file field is required
    // },
    response: {
      200: {
        type: "object",
        properties: {
          filePath: { type: "string" },
          mimetype: { type: "string" },
        },
      },
      500: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      400: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  };
}

export const generateRandomId = () => {
  const randomPart = randomBytes(8).toString("hex");
  const timestamp = Date.now().toString();
  return `${randomPart}-${timestamp}`;
};