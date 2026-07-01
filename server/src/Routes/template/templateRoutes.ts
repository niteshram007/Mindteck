import { FastifyInstance } from "fastify";
//Locals
import { templateHandlers } from "./templateHandlers";
import { validate } from "../../Middleware/validation.middleware";
import { templateCreateSchema, templateUpdateSchema } from "./templateSchemas";
import { authorize } from "../../Middleware/authorize.middleware";

export function templateRoutes(app: FastifyInstance) {
  

  app.post(
    "/create/:url",
    {
      preHandler: [authorize(["SuperAdmin"]),validate(templateCreateSchema)],
      // schema: JsonTemplateSchema,
    },
    templateHandlers.create,
  );

  app.post(
    "/update/:url",
    {
      preHandler: [authorize(["SuperAdmin"]),validate(templateUpdateSchema)],
      // schema: JsonTemplateSchema,
    },
    templateHandlers.update,
  );
}
