import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { StockExchangeFilingType, StockExchangeFilingUpdateType } from "./stockExchangeFillingSchemas";
import { stockExchangeFilingService } from "./stockExchangeFillingService";
import { saveFileService } from "../../../utils/service";

const collection = CollectionName.investorStockExchangeFiling;

export const stockExchangeFilingHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorStockExchangeFiling, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },

  async createStockExchangeFiling(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as StockExchangeFilingType;
    const stockExchangeFiling = req.server.mongo.db!.collection<StockExchangeFilingType>(collection);

    try {
      const result = await stockExchangeFilingService.createStockExchangeFiling(stockExchangeFiling, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateStockExchangeFiling(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedMain = req.body as StockExchangeFilingUpdateType;
    const stockExchangeFiling = req.server.mongo.db!.collection<StockExchangeFilingType>(collection);
    try {
      const result = await stockExchangeFilingService.updateStockExchangeFiling(stockExchangeFiling, updatedMain, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getStockExchangeFilings(req: FastifyRequest, reply: FastifyReply) {
    const stockExchangeFiling = req.server.mongo.db!.collection<StockExchangeFilingType>(collection);
    try {
      const policyCategories = await stockExchangeFilingService.getStockExchangeFilings(stockExchangeFiling);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBySession(req: FastifyRequest, reply: FastifyReply) {
    const stockExchangeFiling = req.server.mongo.db!.collection<StockExchangeFilingType>(collection);
    const { session } = req.query as { session: string | undefined };
    try {
      const policyCategories = await stockExchangeFilingService.getBySession(stockExchangeFiling, session);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteStockExchangeFilingById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const stockExchangeFiling = req.server.mongo.db!.collection<StockExchangeFilingType>(collection);

    try {
      const result = await stockExchangeFilingService.deleteStockExchangeFilingById(stockExchangeFiling, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteItemStockExchangeFilingById(req: FastifyRequest, reply: FastifyReply) {
    const { objectId, id } = req.params as { objectId: string; id: string };
    const stockExchangeFiling = req.server.mongo.db!.collection<StockExchangeFilingType>(collection);

    try {
      const result = await stockExchangeFilingService.deleteItemStockExchangeFilingById(
        stockExchangeFiling,
        objectId,
        id,
      );
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
