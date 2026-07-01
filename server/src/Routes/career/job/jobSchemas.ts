import { z } from "zod";
import { ObjectIdSchema } from "../../../utils/schema";
import zodToJsonSchema from "zod-to-json-schema";

const jobStatusEnum = z.enum(["Active", "Expired"]);
const jobReviewStatusEnum = z.enum(["Approved", "Rejected", "Pending"]);
const jobTypeEnum = z.enum(["Full-time", "Part-time", "Contract", "Internship"]);

const countyCodeMap = {
  india: "IN",
  "united states": "US",
  canada: "CA",
  europe: "EU",
  apac: "APAC",
  "middle east": "ME",
} as const;

function generateJobCode(country: string) {
  const datePart = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
    .format(new Date())
    .replace(/\//g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  const CC = countyCodeMap[country.replace(/[^a-zA-Z\s]/g, "").toLowerCase()] || "IN";
  return `${CC}-${datePart}-${randomPart}`;
}

const jobUpdateSchema = z.object({
  categoryId: ObjectIdSchema,
  title: z.string().min(1, "Job title is required").max(150, "Job title is too long"),
  experience: z.number().positive().default(1),
  qualifications: z.string(),
  skills: z.string(),
  responsibilities: z.string(),
  country: z.string().min(1, "country is required").max(200, "country is too long"),
  city: z.string().min(1, "city is required").max(200, "city is too long"),
  jobType: jobTypeEnum.default("Full-time"),
  isRemote: z.boolean().optional(),
  status: jobStatusEnum.default("Active"),
  reviewStatus: jobReviewStatusEnum.default("Pending"),
  jobDescription: z.string().min(10, "Job description should be at least 10 characters long"),
});

const jobReviewAndUpdate = z.object({
  review: z.string().optional(),
  reviewStatus: jobReviewStatusEnum.default("Pending"),
});

const jobCreateSchema = jobUpdateSchema.transform((data) => {
  const jobCode = generateJobCode(data.country);
  return { ...data, jobCode };
});

function jobQuerystring(tags: string[]) {
  return {
    tags,
    querystring: {
      type: "object",
      properties: {
        categoryId: {
          type: "string",
          pattern: "^[0-9a-fA-F]{24}$",
          description: "category ID (ObjectId)",
        },
        city: {
          type: "string",
          maxLength: 50,
          description: "city as a string",
        },
        keyword: {
          type: "string",
          maxLength: 100,
        },
        jobType: {
          type: "array",
          items: { type: "string", enum: ["Full-time", "Part-time", "Contract", "Internship"] },
          uniqueItems: true,
        },
        experience: {
          type: "number",
          minimum: 1,
        },

        page: { type: "integer", minimum: 1, default: 1 },
        pageSize: { type: "integer", minimum: 1, default: 10 },
      },
      required: [],
    },
  };
}

const JsonJobCreateSchema = {
  tags: ["Job"],
  body: zodToJsonSchema(jobCreateSchema, { $refStrategy: "none" }),
  response: {
    201: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

const JsonJobUpdateSchema = {
  tags: ["Job"],
  body: zodToJsonSchema(jobUpdateSchema, { $refStrategy: "none" }),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
  },
};

export type JobType = z.infer<typeof jobCreateSchema>;
export type JobUpdateType = z.infer<typeof jobUpdateSchema>;
export type JobStatusType = z.infer<typeof jobStatusEnum>;
export type jobReviewStatusType = z.infer<typeof jobReviewAndUpdate>;
export type jobTypeType = z.infer<typeof jobTypeEnum>;

export {
  jobCreateSchema,
  jobReviewAndUpdate,
  JsonJobCreateSchema,
  jobStatusEnum,
  jobReviewStatusEnum,
  jobTypeEnum,
  jobUpdateSchema,
  JsonJobUpdateSchema,
  jobQuerystring,
};
