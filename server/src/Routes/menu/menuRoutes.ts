import { z } from "zod";
import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";

import { menuHandlers } from "./menuHandlers";
import { positionEnum, JsonMenuSchema, MenuSchema } from "./menuSchemas";
import { validate } from "../../Middleware/validation.middleware";
import { MenuPositions } from "../../constants";
import { authorize } from "../../Middleware/authorize.middleware";

export function menuRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    {
      schema: JsonMenuSchema,
      preHandler: [ authorize(["SuperAdmin"]), validate(MenuSchema)],
    },

    menuHandlers.createMenu,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonMenuSchema,
      preHandler: [ authorize(["SuperAdmin"]), validate(MenuSchema)],
    },

    menuHandlers.updateMenu,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Menu"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    menuHandlers.getMenus,
  );

  app.get(
    "/getall/:position",
    {
      schema: {
        tags: ["Menu"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    menuHandlers.getMenusByPosition,
  );

  app.get(
    "/getallHierarchically/:position",
    {
      schema: {
        tags: ["Menu"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    menuHandlers.getMenusHierarchicallyByPosition,
  );

  app.get(
    "/getallActiveHierarchically/:position",
    {
      schema: {
        tags: ["Menu"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    menuHandlers.getActiveMenusHierarchicallyByPosition,
  );

  app.get(
    "/positions",
    {
      schema: {
        tags: ["Menu"],
        response: {
          200: zodToJsonSchema(positionEnum),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    async (_req, reply) => {
      reply.send(MenuPositions);
    },
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Menu"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"]),
    },

    menuHandlers.deleteMenuById,
  );
}
