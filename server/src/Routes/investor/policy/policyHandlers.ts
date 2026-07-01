import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { PolicyType } from "./policySchemas";
import { policyService } from "./policyService";
import { saveFileService } from "../../../utils/service";

const collection = CollectionName.investorPolicies;

export const policyHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorPolicies, [
      "image/jpeg",
      "image/png",
      "application/pdf",
    ]);
  },

  async createPolicy(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as PolicyType;
    const policy = req.server.mongo.db!.collection<PolicyType>(collection);

    try {
      const result = await policyService.createPolicy(policy, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updatePolicy(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedMain = req.body as PolicyType;
    const policy = req.server.mongo.db!.collection<PolicyType>(collection);
    try {
      const result = await policyService.updatePolicy(policy, updatedMain, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPolicies(req: FastifyRequest, reply: FastifyReply) {
    const policy = req.server.mongo.db!.collection<PolicyType>(collection);
    try {
      const policyCategories = await policyService.getPolicies(policy);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
  async getActivePolicies(req: FastifyRequest, reply: FastifyReply) {
    const policy = req.server.mongo.db!.collection<PolicyType>(collection);
    try {
      const policyCategories = await policyService.getActivePolicies(policy);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deletePolicyById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const policy = req.server.mongo.db!.collection<PolicyType>(collection);

    try {
      const result = await policyService.deletePolicyById(policy, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
