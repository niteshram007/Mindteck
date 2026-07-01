import { FastifyInstance } from "fastify";
//Locals
import { stockHandlers } from "./stockPriceHandlers";

export function stockRoutes(app: FastifyInstance) {
  app.get(
    "/getPrice",
    {
      schema: {
        tags: ["Stock"],
      },
    },
    stockHandlers.getPrice,
  );
}
