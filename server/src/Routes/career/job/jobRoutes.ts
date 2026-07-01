import { z } from "zod";
import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
//Locals
import { jobHandlers } from "./jobHandlers";
import { validate } from "../../../Middleware/validation.middleware";
import { authorize } from "../../../Middleware/authorize.middleware";
import {
  jobCreateSchema,
  jobQuerystring,
  jobReviewAndUpdate,
  jobReviewStatusEnum,
  jobStatusEnum,
  jobUpdateSchema,
  JsonJobCreateSchema,
  JsonJobUpdateSchema,
} from "./jobSchemas";

export function jobRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    {
      schema: JsonJobCreateSchema,
      preHandler: [validate(jobCreateSchema)],
    },

    jobHandlers.createJob,
  );

  app.put(
    "/update/:id",
    {
      schema: {
        ...JsonJobUpdateSchema,
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
              description: "ID (ObjectId)",
            },
          },
          required: ["id"],
        },
      },
      preHandler: [validate(jobUpdateSchema)],
    },

    jobHandlers.updateJob,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Job"],
        querystring: {
          type: "object",
          properties: {
            categoryId: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
              description: "category ID (ObjectId)",
            },
            searchTerm: {
              type: "string",
              minLength: 3,
              description:
                "jobType, experience, city, country, mobileNo., status, reviewStatus, jobCode reviewedBy, createdBy",
            },
            reviewStatus: zodToJsonSchema(jobReviewStatusEnum),
            page: { type: "integer", minimum: 1, default: 1 },
            pageSize: { type: "integer", minimum: 1, default: 10 },
          },
          required: [],
        },
      },
    },
    jobHandlers.getJobs,
  );

  app.get(
    "/getall-active",
    {
      schema: jobQuerystring(["Job"]),
    },
    jobHandlers.getJobActiveJobs,
  );

  app.get(
    "/get-jobs-with-application-count",
    {
      schema: {
        tags: ["Job"],
        querystring: {
          type: "object",
          properties: {
            categoryId: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
              description: "category ID (ObjectId)",
            },
          },
          required: [],
        },
      },
    },
    jobHandlers.getJobsWithApplicationCount,
  );

  app.get(
    "/get-jobs-by-userId-with-application-count",
    {
      schema: {
        tags: ["Job"],
        querystring: {
          type: "object",
          properties: {
            categoryId: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
              description: "category ID (ObjectId)",
            },
          },
          required: [],
        },
      },
    },
    jobHandlers.getJobsByUserIdWithApplicationCount,
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["Job"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
              description: "ID (ObjectId)",
            },
          },
          required: ["id"],
        },
      },
    },

    jobHandlers.getJobById,
  );

  app.get(
    "/getByJobCode/:code",
    {
      schema: {
        tags: ["Job"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
          },
          required: ["id"],
        },
      },
    },

    jobHandlers.getJobByJobCode,
  );

  app.get(
    "/get-unique-cities",
    {
      schema: {
        tags: ["Job"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
              description: "ID (ObjectId)",
            },
          },
          required: ["id"],
        },
      },
    },

    jobHandlers.getUniqueCities,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Job"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
              description: "ID (ObjectId)",
            },
          },
          required: ["id"],
        },
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
    },

    jobHandlers.deleteJobById,
  );

  app.put(
    "/update-job-status/:id",
    {
      schema: {
        tags: ["Job"],
        body: zodToJsonSchema(z.object({ status: jobStatusEnum })),
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              pattern: "^[0-9a-fA-F]{24}$",
              description: "ID (ObjectId)",
            },
          },
          required: ["id"],
        },
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: validate(
        z.object({
          status: jobStatusEnum,
        }),
      ),
    },

    jobHandlers.changeJobStatusById,
  );

  app.put(
    "/update-review-status/:id",
    {
      schema: {
        tags: ["Job"],
        body: zodToJsonSchema(jobReviewAndUpdate, { $refStrategy: "none" }),
        response: {
          200: zodToJsonSchema(
            z.object({
              message: z.string(),
            }),
          ),
        },
      },
      preHandler: [authorize(["Admin", "SuperAdmin"]), validate(jobReviewAndUpdate)],
    },

    jobHandlers.updateReviewStatus,
  );
}
