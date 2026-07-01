import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionName } from "../../../constants/collection";
import { handleError } from "../../../error/handleError";
import { TradingWindowType, TradingWindowUpsertType } from "./tradingWindowSchemas";
import { tradingWindowService } from "./tradingWindowService";

const collection = CollectionName.investorTradingWindow;

export const tradingWindowHandlers = {
  async getTradingWindow(req: FastifyRequest, reply: FastifyReply) {
    const tradingWindowCollection =
      req.server.mongo.db!.collection<TradingWindowType>(collection);

    try {
      const result = await tradingWindowService.getTradingWindow(tradingWindowCollection);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async upsertTradingWindow(req: FastifyRequest, reply: FastifyReply) {
    const tradingWindowCollection =
      req.server.mongo.db!.collection<TradingWindowType>(collection);
    const payload = req.body as TradingWindowUpsertType;

    try {
      const result = await tradingWindowService.upsertTradingWindow(
        tradingWindowCollection,
        payload,
      );
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
