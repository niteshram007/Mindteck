import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
import { FastifyInstance } from "fastify";
//
import { JsonPartnerAndAllianceSchema, PartnerAndAllianceSchema } from "./partnerAndAllianceSchemas";
import { partnerAndAllianceHandlers } from "./partnerAndAllianceHandlers";
import { validate } from "../../Middleware/validation.middleware";
import { uploadSchema } from "../../utils/schema";

export function partnerAndAllianceRoutes(app: FastifyInstance) {
  app.post(
    "/upload",
    { schema: uploadSchema(["Partner And Alliance"]) },
    partnerAndAllianceHandlers.uploadPartnerAndAllianceImage,
  );

  app.post(
    "/create",
    {
      schema: JsonPartnerAndAllianceSchema,
      preHandler: [validate(PartnerAndAllianceSchema)],
    },

    partnerAndAllianceHandlers.createPartnerAndAlliance,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonPartnerAndAllianceSchema,
      preHandler: [validate(PartnerAndAllianceSchema)],
    },

    partnerAndAllianceHandlers.updatePartnerAndAlliance,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Partner And Alliance"],
      },
    },
    partnerAndAllianceHandlers.getPartnerAndAlliances,
  );

  app.get(
    "/getallActive",
    {
      schema: {
        tags: ["Partner And Alliance"],
      },
    },
    partnerAndAllianceHandlers.getActivePartnerAndAlliances,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Partner And Alliance"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
    },

    partnerAndAllianceHandlers.deletePartnerAndAllianceById,
  );
}
