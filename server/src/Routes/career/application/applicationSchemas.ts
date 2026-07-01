import { z } from "zod";
import { ObjectIdSchema } from "../../../utils/schema";
import zodToJsonSchema from "zod-to-json-schema";

const panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const mobileNoPattern = /^\d{10}$/;
const applicationStatus = z.enum(["Pending", "Shortlisted", "Rejected", "Interviewed", "Offer Extended", "Hired"]);
const skillsSetSchema = z.string();

const dobSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in yyyy-mm-dd format")
  .transform((val) => {
    const date = new Date(val);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
    return date;
  }).optional();

  const qualificationSchema = z.object({
  courseName: z.string().min(1, "Course name is required").optional(),
  university: z.string().min(1, "University is required").optional(),
  yearOfPassing: z
    .number()
    .int()
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .optional(),
});

const employmentDetailsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().optional(),
  duration: z.object({
    years: z.number().positive(),
    months: z.number().positive().max(12, "Months cannot exceed 12"),
  }),
  salary: z.number().positive("Salary must be a positive number").multipleOf(10_000),
  expectedCtc: z.number().positive("Salary must be a positive number").multipleOf(10_000),
  totalExperience: z
    .number()
    .positive("Experience must be a positive number")
    .refine((value) => Number.isInteger(value * 10), {
      message: "Number must have at most one digit after the decimal",
    }),
});

const applicationStatusSchema = z.object({
  applicationStatus: z.string().default("Pending"),
  remarks: z.string().max(500).optional(),
  interviewDate: z.coerce.date().optional(),
});


const applicationSchema = z.object({
  jobId: ObjectIdSchema,
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  dateOfBirth: dobSchema,
  gender: z.enum(["Male", "Female"], { message: "Gender is required" }),
  email: z.string().email("Invalid email address"),
  passportNo: z.string().max(100, "Passport number is required").optional(),
  mobileNo: z.string().refine((value) => !value  || mobileNoPattern.test(value), {
    message: "Mobile number must be exactly 10 digits",
  }),
  panCardNo: z
    .string()
    .refine((value) => !value || panCardPattern.test(value), { message: "Invalid PAN card format" })
    .optional(),
  skillsSet: skillsSetSchema,
  qualifications: qualificationSchema,
  employmentDetails: employmentDetailsSchema,
  file: z.object({
    filePath: z.string(),
    mimetype: z.string(),
  }),
});

const applicationCreateSchema = applicationSchema.extend({token:z.string()});

const JsonApplicationCreateSchema = (tags: string[]) => {
  return {
    tags,
    body: zodToJsonSchema(applicationCreateSchema, { $refStrategy: "none" }),
    response: {
      200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
    },
  };
};

const JsonApplicationSchema = (tags: string[]) => {
  return {
    tags,
    body: zodToJsonSchema(applicationSchema, { $refStrategy: "none" }),
    response: {
      200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
    },
  };
};

const JsonApplicationStatusSchema = (tags: string[]) => {
  return {
    tags,
    body: zodToJsonSchema(applicationStatusSchema, { $refStrategy: "none" }),
    response: {
      200: zodToJsonSchema(z.object({ message: z.string() }), { $refStrategy: "none" }),
    },
  };
};

const applicationQuerySchema = z.object({
  jobId: ObjectIdSchema.optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  gender: z.enum(["Male", "Female"]).optional(),
  email: z.string().email().optional(),
  salaryMin: z.number().positive("Salary must be a positive number"),
  salaryMax: z.number().positive("Salary must be a positive number"),

  expectedCtcMin: z.number().positive("expected CTC must be a positive number"),
  expectedCtcMax: z.number().positive("expected CTC must be a positive number"),

  totalExperienceMin: z.number().positive("Experience must be a positive number"),
  totalExperienceMax: z.number().positive("Experience must be a positive number"),

  mobileNo: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  skillsSet: skillsSetSchema.optional(),
  applicationStatus: applicationStatus.optional(),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).default(10),
});

const applicationQuerystring = {
  type: "object",
  properties: {
    jobId: {
      type: "string",
      pattern: "^[0-9a-fA-F]{24}$",
      description: "Job ID (ObjectId)",
    },
    firstName: {
      type: "string",
      minLength: 3,
      description: "First name of the applicant",
    },

    lastName: {
      type: "string",
      minLength: 3,
      description: "Last name of the applicant",
    },

    dateOfBirth: {
      type: "string",
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      description: "Date of birth in yyyy-mm-dd format",
    },

    gender: {
      type: "string",
      enum: ["Male", "Female"],
      description: "Gender of the applicant",
    },

    email: {
      type: "string",
      minLength: 4,
      format: "email",
      description: "Email address of the applicant",
    },

    mobileNo: {
      type: "string",
      pattern: "^\\d{10}$",
      description: "Mobile number (10 digits)",
    },

    skillsSet: {
      type: "string",
      minLength: 3,
      description: "Skills set",
    },

    applicationStatus: {
      type: "string",
      enum: ["Pending", "Shortlisted", "Rejected", "Interviewed", "Offer Extended", "Hired"],
      description: "Current status of the application",
    },

    salaryMin: {
      type: "integer",
      minimum: 0,
      maximum: 99999999,
    },

    salaryMax: {
      type: "integer",
      minimum: 0,
      maximum: 99999999,
    },

    expectedCtcMin: {
      type: "integer",
      minimum: 0,
      maximum: 99999999,
    },

    totalExperienceMin: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },

    totalExperienceMax: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
    page: {
      type: "integer",
      minimum: 1,
      default: 1,
      description: "Page number for pagination",
    },
    pageSize: {
      type: "integer",
      minimum: 1,
      default: 10,
      description: "Page size for pagination",
    },
  },
  required: [],
  additionalProperties: false,
};

// Define the main application schema with dynamic validation
export type ApplicationType = z.infer<typeof applicationSchema>;
export type ApplicationCreateType = z.infer<typeof applicationCreateSchema>;
export type ApplicationStatusType = z.infer<typeof applicationStatusSchema>;
export type ApplicationQueryType = z.infer<typeof applicationQuerySchema>;

export {
  applicationSchema,
  JsonApplicationSchema,
  applicationQuerystring,
  applicationStatusSchema,
  JsonApplicationStatusSchema,
  JsonApplicationCreateSchema,
  applicationCreateSchema,
};
