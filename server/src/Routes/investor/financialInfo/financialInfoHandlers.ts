import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { FinancialInfoType, FinancialInfoUpdateType } from "../financialInfo/financialInfoSchemas";
import { financialInfoService } from "../financialInfo/financialInfoService";
import { saveFileService } from "../../../utils/service";

const collection = CollectionName.investorFinancialInfo;

export const financialInfoHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorFinancialInfo, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },

  async createFinancialInfo(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as FinancialInfoType;
    const financialInfo = req.server.mongo.db!.collection<FinancialInfoType>(collection);

    try {
      const result = await financialInfoService.createFinancialInfo(financialInfo, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateFinancialInfo(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedFinancialInfo = req.body as FinancialInfoUpdateType;
    const financialInfo = req.server.mongo.db!.collection<FinancialInfoType>(collection);
    try {
      const result = await financialInfoService.updateFinancialInfo(financialInfo, updatedFinancialInfo, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getFinancialInfos(req: FastifyRequest, reply: FastifyReply) {
    const financialInfo = req.server.mongo.db!.collection<FinancialInfoType>(collection);
    try {
      const policyCategories = await financialInfoService.getFinancialInfos(financialInfo);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBySession(req: FastifyRequest, reply: FastifyReply) {
    const financialInfo = req.server.mongo.db!.collection<FinancialInfoType>(collection);
    const { session } = req.query as { session: string | undefined };
    try {
      const policyCategories = await financialInfoService.getBySession(financialInfo, session);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteFinancialInfoById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const financialInfo = req.server.mongo.db!.collection<FinancialInfoType>(collection);

    try {
      const result = await financialInfoService.deleteFinancialInfoById(financialInfo, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteItemFinancialInfoById(req: FastifyRequest, reply: FastifyReply) {
    const { objectId, id } = req.params as { objectId: string; id: string };
    const financialInfo = req.server.mongo.db!.collection<FinancialInfoType>(collection);

    try {
      const result = await financialInfoService.deleteItemFinancialInfoById(financialInfo, objectId, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
