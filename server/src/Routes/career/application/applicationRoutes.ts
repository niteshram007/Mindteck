import { z } from "zod";
import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
//Locals
import { applicationHandlers } from "./applicationHandlers";
import { validate } from "../../../Middleware/validation.middleware";
import {
  applicationCreateSchema,
  applicationQuerystring,
  applicationSchema,
  applicationStatusSchema,
  JsonApplicationCreateSchema,
  JsonApplicationSchema,
  JsonApplicationStatusSchema,
} from "./applicationSchemas";
import { uploadSchema } from "../../../utils/schema";

export function applicationRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Application"]) }, applicationHandlers.uploadApplicationFile);
  app.post(
    "/create",
    {
      schema: JsonApplicationCreateSchema(["Application"]),
      preHandler: [validate(applicationCreateSchema)],
    },

    applicationHandlers.createApplication,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonApplicationSchema(["Application"]),
      preHandler: [validate(applicationSchema)],
    },

    applicationHandlers.updateApplication,
  );

  app.put(
    "/updateStatus/:id",
    {
      schema: JsonApplicationStatusSchema(["Application"]),
      preHandler: [validate(applicationStatusSchema)],
    },

    applicationHandlers.updateStatusApplication,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Application"],
        querystring: {
          type: "object",
          properties: {
            search: {
              type: "string",
              minLength: 3,
              description:
                "firstName, lastName, gender, email, mobileNo., skillsSet, applicationStatus, employmentDetailsSchema.salary employmentDetailsSchema.expectedCtc, employmentDetailsSchema.totalExperience",
            },
            page: { type: "integer", minimum: 1, default: 1 },
            pageSize: { type: "integer", minimum: 1, default: 10 },
          },
          required: [],
        },
      },
    },
    applicationHandlers.getApplications,
  );

  app.get(
    "/getall-filter",
    {
      schema: {
        tags: ["Application"],
        querystring: applicationQuerystring,
      },
    },
    applicationHandlers.getApplicationsFiltered,
  );

  app.get(
    "/getall-by-jobId",
    {
      schema: {
        tags: ["Application"],
        querystring: {
          type: "object",
          properties: {
            jobId: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
              description: "A valid MongoDB ObjectId (24-character hexadecimal string)",
            },
            page: { type: "integer", minimum: 1, default: 1 },
            pageSize: { type: "integer", minimum: 1, default: 10 },
          },
          required: ["jobId"],
        },
      },
    },
    applicationHandlers.getApplicationsByJobId,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Application"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
    },

    applicationHandlers.deleteApplicationById,
  );
  app.delete(
    "/bulkDelete",
    {
      schema: {
        tags: ["Application"],
        body: zodToJsonSchema(z.object({ ids: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")) })),
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
    },

    applicationHandlers.deleteBulkApplication,
  );

}
