import { FastifyInstance } from "fastify";
import { authorize } from "../../Middleware/authorize.middleware";
import { cacheHandlers } from "./cacheHandlers";

export function cacheRoutes(app: FastifyInstance) {
  app.post(
    "/clear",
    {
      schema: {
        tags: ["Cache"],
      },
      preHandler: authorize(["SuperAdmin"]),
    },
    cacheHandlers.clearCache,
  );
}
