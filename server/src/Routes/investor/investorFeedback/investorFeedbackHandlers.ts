import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { InvestorFeedbackType } from "./investorFeedbackSchemas";
import { investorFeedbackService } from "./investorFeedbackService";

const collection = CollectionName.investorFeedback;

export const investorFeedbackHandlers = {
  async createInvestorFeedback(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as InvestorFeedbackType & {token:string};
    const investorFeedback = req.server.mongo.db!.collection<InvestorFeedbackType>(collection);

    try {
      const result = await investorFeedbackService.createInvestorFeedback(investorFeedback, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getInvestorFeedBack(req: FastifyRequest, reply: FastifyReply) {
    const investorFeedback = req.server.mongo.db!.collection<InvestorFeedbackType>(collection);
    try {
      const investorFeedbackCategories = await investorFeedbackService.getInvestorFeedBack(investorFeedback);
      reply.send(investorFeedbackCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteInvestorFeedbackById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const investorFeedback = req.server.mongo.db!.collection<InvestorFeedbackType>(collection);

    try {
      const result = await investorFeedbackService.deleteInvestorFeedbackById(investorFeedback, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteInvestorBulkFeedback(req: FastifyRequest, reply: FastifyReply) {
    const investorFeedback = req.server.mongo.db!.collection<InvestorFeedbackType>(collection);
    const { ids } = req.body as { ids: string[] };

    try {
      const result = await investorFeedbackService.deleteInvestorBulkFeedback(investorFeedback, ids);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
