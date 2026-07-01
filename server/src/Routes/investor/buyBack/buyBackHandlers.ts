import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import {
  BuyBackDailyReportType,
  BuyBackDailyReportUpdateType,
  BuyBackGeneralUpdateType,
  BuyBackGeneralUpdateUpdateType,
  BuyBackType,
} from "../buyBack/buyBackSchemas";
import { buyBackService } from "../buyBack/buyBackService";
import { saveFileService } from "../../../utils/service";

const collection = CollectionName.investorBuyBack;

export const buyBackHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorBuyBack, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },

  async createDailyReportsBuyBack(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as BuyBackDailyReportType;
    const buyBack = req.server.mongo.db!.collection<BuyBackType>(collection);

    try {
      const result = await buyBackService.createDailyReportsBuyBack(buyBack, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async createGeneralUpdateBuyBack(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as BuyBackGeneralUpdateType;
    const buyBack = req.server.mongo.db!.collection<BuyBackType>(collection);

    try {
      const result = await buyBackService.createGeneralUpdateBuyBack(buyBack, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
  //Update
  async updateDailyReportsBuyBack(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as BuyBackDailyReportUpdateType;
    const buyBack = req.server.mongo.db!.collection<BuyBackType>(collection);

    try {
      const result = await buyBackService.updateDailyReportsBuyBack(buyBack, data);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateGeneralUpdateBuyBack(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as BuyBackGeneralUpdateUpdateType;
    const buyBack = req.server.mongo.db!.collection<BuyBackType>(collection);

    try {
      const result = await buyBackService.updateGeneralUpdateBuyBack(buyBack, data);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBuyBacks(req: FastifyRequest, reply: FastifyReply) {
    const buyBack = req.server.mongo.db!.collection<BuyBackType>(collection);
    try {
      const policyCategories = await buyBackService.getBuyBacks(buyBack);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBuyBacksByYear(req: FastifyRequest, reply: FastifyReply) {
    const buyBack = req.server.mongo.db!.collection<BuyBackType>(collection);
    const { session } = req.query as { session: number | undefined };
    try {
      const policyCategories = await buyBackService.getBuyBacksByYear(buyBack, session);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteBuyBackById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const buyBack = req.server.mongo.db!.collection<BuyBackType>(collection);

    try {
      const result = await buyBackService.deleteBuyBackById(buyBack, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteDailyUpdatedBuyBackByDate(req: FastifyRequest, reply: FastifyReply) {
    const { objectId, month, date } = req.params as { objectId: string; month: string; date: string };
    const buyBack = req.server.mongo.db!.collection<BuyBackType>(collection);

    try {
      const result = await buyBackService.deleteDailyUpdatedBuyBackByDate(buyBack, objectId, month, date);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteGeneralUpdatedBuyBackById(req: FastifyRequest, reply: FastifyReply) {
    const { objectId, id } = req.params as { objectId: string; id: string };
    const buyBack = req.server.mongo.db!.collection<BuyBackType>(collection);

    try {
      const result = await buyBackService.deleteGeneralUpdatedBuyBackById(buyBack, objectId, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
