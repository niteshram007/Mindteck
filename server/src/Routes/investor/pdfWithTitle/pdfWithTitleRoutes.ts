import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";


import { validate } from "../../../Middleware/validation.middleware";
import { JsonPdfWithTitleSchema, PdfWithTitleSchema } from "./pdfWithTitleSchemas";
import { PdfWithTitleHandlers } from "./pdfWithTitleHandlers";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function pdfWithTitleRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["PDF With Title"]), preHandler:authorize(["SuperAdmin"]) }, PdfWithTitleHandlers.uploadImage);
  app.post(
    "/create",
    {
      schema: JsonPdfWithTitleSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PdfWithTitleSchema)],
    },

    PdfWithTitleHandlers.createPdfWithTitle,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonPdfWithTitleSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PdfWithTitleSchema)],
    },

    PdfWithTitleHandlers.updatePdfWithTitle,
  );

  app.get(
    "/getall/:type",
    {
      schema: {
        tags: ["PDF With Title"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    PdfWithTitleHandlers.getPdfWithTitleByType,
  );

  app.get(
    "/getallActive/:type",
    {
      schema: {
        tags: ["PDF With Title"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    PdfWithTitleHandlers.getActivePdfWithTitleByType,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["PDF With Title"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    PdfWithTitleHandlers.getPdfWithTitle,
  );

  app.get(
    "/getallActive",
    {
      schema: {
        tags: ["PDF With Title"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    PdfWithTitleHandlers.getActivePdfWithTitle,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["PDF With Title"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    PdfWithTitleHandlers.deletePdfWithTitleById,
  );
}
