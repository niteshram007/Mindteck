import { ZodSchema } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { handleError } from "../error/handleError";

export const validate = (schema: ZodSchema) => async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const validatedBody = schema.parse(request.body);
    request.body = validatedBody;
  } catch (error) {
    handleError(reply, error, request);
  }
};
