import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { PdfHandlers } from "./pdfHandlers";
import { JsonPdfSchema, PdfSchema } from "./pdfSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function pdfRoutes(app: FastifyInstance) {
app.post("/upload", { schema: uploadSchema(["PDF"]), preHandler:authorize(["SuperAdmin"]) }, PdfHandlers.uploadImage);

  app.post(
    "/create",
    {
      schema: JsonPdfSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PdfSchema)],
    },

    PdfHandlers.createPdf,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonPdfSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(PdfSchema)],
    },

    PdfHandlers.updatePdf,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["PDF"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    PdfHandlers.getPdf,
  );

  app.get(
    "/getallActive",
    {
      schema: {
        tags: ["PDF"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    PdfHandlers.getActivePdf,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["PDF"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    PdfHandlers.deletePdfById,
  );
}
