import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
//==================================== Local ============================================
import { validate } from "../../Middleware/validation.middleware";
import { caseStudyHandlers } from "./caseStudyHandle";
import { JsonCaseStudySchema, CaseStudySchema } from "./caseStudySchemas";
import { uploadSchema } from "../../utils/schema";
import { authorize } from "../../Middleware/authorize.middleware";

export function caseStudyRoutes(app: FastifyInstance) {
  app.post(
    "/upload",
    { schema: uploadSchema(["Case Study"]), preHandler: authorize(["SuperAdmin"]) },
    caseStudyHandlers.uploadCaseStudyImage,
  );

  // Route: Create CaseStudies
  app.post(
    "/create",
    {
      schema: JsonCaseStudySchema,
      preHandler: [authorize(["SuperAdmin"]), validate(CaseStudySchema)],
    },

    caseStudyHandlers.createCaseStudy,
  );

  // Route: Update CaseStudies
  app.put(
    "/update/:id",
    {
      schema: JsonCaseStudySchema,
      preHandler: [authorize(["SuperAdmin"]), validate(CaseStudySchema)],
    },

    caseStudyHandlers.updateCaseStudy,
  );

  // Route: Get All CaseStudies
  app.get(
    "/getall",
    {
      schema: {
        tags: ["Case Study"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    caseStudyHandlers.getCaseStudies,
  );
  // Route: Get All CaseStudies
  app.get(
    "/getCaseStudyById/:id",
    {
      schema: {
        tags: ["Case Study"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    caseStudyHandlers.getSingleCaseStudy,
  );

  app.post(
    "/getallByCategories",
    {
      schema: {
        tags: ["Case Study"],
        body: zodToJsonSchema(z.object({ categories: z.array(z.string()).min(1) }), { $refStrategy: "none" }),
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    caseStudyHandlers.getCaseStudiesByCategories,
  );

  app.post(
    "/getallByCategoriesActive",
    {
      schema: {
        tags: ["Case Study"],
        body: zodToJsonSchema(z.object({ categories: z.array(z.string()).min(1) }), { $refStrategy: "none" }),
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    caseStudyHandlers.getActiveCaseStudiesByCategories,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Case Study"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    caseStudyHandlers.deleteCaseStudyById,
  );
}
