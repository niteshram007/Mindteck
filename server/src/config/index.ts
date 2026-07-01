import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

// Define schema for environment variables using Zod
const ConfigSchema = z.object({
  MONGO_URI: z.string().url().describe("MongoDB connection string"),
  PORT: z.string().regex(/^\d+$/).transform(Number).describe("Application port"),
  JWT_SECRET: z.string().min(8).describe("JWT secret key"),
  HOST: z.string().default("localhost").describe("Server host"),
  CRON: z.string().default("0 0 * * 0").describe("CRON"),
  ERROR_LOG: z.string().default("logs").describe("ERROR_LOG"),
  File_SIZE: z.string().transform(Number).describe("File SIze"),
  Resume_File_Size: z.string().transform(Number).describe("File SIze"),
  RECAPTCHA_SECRET_KEY: z.string().describe("RECAPTCHA_SECRET_KEY"),
  BSE_URL: z.string().url().describe("BSE URL"),
  NSE_URL: z.string().url().describe("NSE URL"),
  SMTP_HOST: z.string().default("smtpout.secureserver.net").describe("SMTP host"),
  SMTP_PORT: z.string().regex(/^\d+$/).default("587").transform(Number).describe("SMTP port"),
  SMTP_USER: z.string().default("info@mindteck.com").describe("SMTP username"),
  SMTP_PASSWORD: z.string().default("Sys@mind4").describe("SMTP password"),
  SMTP_SECURE: z.string().default("false").transform((v) => v === "true").describe("SMTP secure"),
  INDUSTRY_NOTIFICATION_EMAIL: z.string().default("gnana.murthy@mindteck.com").describe("Industry notification email"),
  INVESTOR_NOTIFICATION_EMAIL: z.string().default("gnana.murthy@mindteck.com").describe("Investor notification email"),
});

// Validate and parse the environment variables
const config = ConfigSchema.safeParse(process.env);

if (!config.success) {
  console.error("Invalid environment variables:", config.error.format());
  process.exit(1);
}

export const ENV = config.data;
