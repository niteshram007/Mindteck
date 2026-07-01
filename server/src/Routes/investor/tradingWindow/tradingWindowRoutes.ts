import { FastifyInstance } from "fastify";
import { authorize } from "../../../Middleware/authorize.middleware";
import { validate } from "../../../Middleware/validation.middleware";
import { tradingWindowHandlers } from "./tradingWindowHandlers";
import {
  JsonTradingWindowGetSchema,
  JsonTradingWindowUpsertSchema,
  tradingWindowUpsertSchema,
} from "./tradingWindowSchemas";

export function tradingWindowRoutes(app: FastifyInstance) {
  app.get(
    "/get",
    {
      schema: JsonTradingWindowGetSchema,
      preHandler: authorize(["SuperAdmin"]),
    },
    tradingWindowHandlers.getTradingWindow,
  );

  app.put(
    "/upsert",
    {
      schema: JsonTradingWindowUpsertSchema,
      preHandler: [authorize(["SuperAdmin"]), validate(tradingWindowUpsertSchema)],
    },
    tradingWindowHandlers.upsertTradingWindow,
  );
}
