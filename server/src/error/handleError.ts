import { FastifyReply, FastifyRequest } from "fastify";
import { MongoServerError } from "mongodb";
import { ZodError } from "zod";
import CustomError from ".";
import { log, debug } from "console";

export function handleError(reply: FastifyReply, error: unknown, request: FastifyRequest) {
  const errorResponse = {
    error: "Internal Server Error",
    message: "An unexpected error occurred.",
    code: 500,
  };

  // Log the incoming error for easier tracking in the logs
  debug(":::::::Error occurred::::::::", error);

  if (error instanceof ZodError) {
    // Zod validation error
    log("Zod Validation Error:", request.body);
    const message = error.errors.map((issue) => ({
      field: issue.path.join("."),
      error: issue.message,
    }));
    errorResponse.error = "Validation Error";
    errorResponse.message = JSON.stringify(message);
    errorResponse.code = 422;
    reply.code(422);
  } else if (error instanceof MongoServerError) {
    // MongoDB error
    log("MongoDB Error:", error);
    errorResponse.error = error.errorResponse.message || "MongoError";
    errorResponse.message = error.errorResponse.errmsg || "Unknown MongoDB error";
    errorResponse.code = error.code ? parseInt(String(error.code), 10) : 400;
    reply.code(400);
  } else if (error instanceof CustomError) {
    // Custom error
    errorResponse.error = error.message;
    errorResponse.message = error.message || "Failed to process";
    errorResponse.code = 400;
    reply.code(400);
  } else if (error instanceof Error) {
    // Generic error (base Error class)
    errorResponse.error = error.message;
    errorResponse.message = error.message || "Unknown error";
    reply.code(400);
  } else {
    // Log an unknown error that doesn't match any specific type
    request.log.error("Unknown Error:");
    errorResponse.error = "Unknown Error";
    errorResponse.message = "An unexpected error occurred.";
    reply.code(500); // You may want to change the status code based on the unknown error
  }

  // Send the structured error response
  return reply.send(errorResponse);
}
