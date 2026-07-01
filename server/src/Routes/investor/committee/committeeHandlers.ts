import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { CommitteeType } from "./committeeSchemas";
import { CommitteeService } from "./committeeService";

export const CommitteeHandlers = {
  async createCommittee(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as CommitteeType;
    const Committee = req.server.mongo.db!.collection<CommitteeType>(CollectionName.investorCommittee);

    try {
      const result = await CommitteeService.createCommittee(Committee, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateCommittee(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedMain = req.body as CommitteeType;
    const Committee = req.server.mongo.db!.collection<CommitteeType>(CollectionName.investorCommittee);
    try {
      const result = await CommitteeService.updateCommittee(Committee, updatedMain, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getCommittees(req: FastifyRequest, reply: FastifyReply) {
    const Committee = req.server.mongo.db!.collection<CommitteeType>(CollectionName.investorCommittee);
    try {
      const committees = await CommitteeService.getCommittees(Committee);
      reply.send(committees);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getCommitteeGrouped(req: FastifyRequest, reply: FastifyReply) {
    const Committee = req.server.mongo.db!.collection<CommitteeType>(CollectionName.investorCommittee);
    try {
      const committees = await CommitteeService.getCommitteeGrouped(Committee);
      reply.send(committees);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteCommitteeById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const Committee = req.server.mongo.db!.collection<CommitteeType>(CollectionName.investorCommittee);

    try {
      const result = await CommitteeService.deleteCommitteeById(Committee, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
