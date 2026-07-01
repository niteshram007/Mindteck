import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { SubsidiariesFinancialType, SubsidiariesFinancialUpdateType } from "./subsidiariesFinancialSchemas";
import { subsidiariesFinancialService } from "./subsidiariesFinancialService";
import { saveFileService } from "../../../utils/service";

export const SubsidiariesFinancialHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorSubsidiariesFinancial, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },

  async createSubsidiariesFinancial(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as SubsidiariesFinancialType;
    const SubsidiariesFinancial = req.server.mongo.db!.collection<SubsidiariesFinancialType>(
      CollectionName.investorSubsidiariesFinancial,
    );

    try {
      const result = await subsidiariesFinancialService.createSubsidiariesFinancial(SubsidiariesFinancial, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateSubsidiariesFinancial(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const subsidiariesFinancialUpdate = req.body as SubsidiariesFinancialUpdateType;
    const SubsidiariesFinancial = req.server.mongo.db!.collection<SubsidiariesFinancialType>(
      CollectionName.investorSubsidiariesFinancial,
    );
    try {
      const result = await subsidiariesFinancialService.updateSubsidiariesFinancial(
        SubsidiariesFinancial,
        subsidiariesFinancialUpdate,
        id,
      );
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getSubsidiariesFinancial(req: FastifyRequest, reply: FastifyReply) {
    const SubsidiariesFinancial = req.server.mongo.db!.collection<SubsidiariesFinancialType>(
      CollectionName.investorSubsidiariesFinancial,
    );
    try {
      const subsidiariesFinancial = await subsidiariesFinancialService.getSubsidiariesFinancial(SubsidiariesFinancial);
      reply.send(subsidiariesFinancial);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBySessionSubsidiariesFinancial(req: FastifyRequest, reply: FastifyReply) {
    const SubsidiariesFinancial = req.server.mongo.db!.collection<SubsidiariesFinancialType>(
      CollectionName.investorSubsidiariesFinancial,
    );
    const { session } = req.query as { session: string | undefined };
    try {
      const subsidiariesFinancial = await subsidiariesFinancialService.getBySessionSubsidiariesFinancial(
        SubsidiariesFinancial,
        session,
      );
      reply.send(subsidiariesFinancial);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveSubsidiariesFinancial(req: FastifyRequest, reply: FastifyReply) {
    const SubsidiariesFinancial = req.server.mongo.db!.collection<SubsidiariesFinancialType>(
      CollectionName.investorSubsidiariesFinancial,
    );
    try {
      const subsidiariesFinancial =
        await subsidiariesFinancialService.getActiveSubsidiariesFinancial(SubsidiariesFinancial);
      reply.send(subsidiariesFinancial);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteSubsidiariesFinancialById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const SubsidiariesFinancial = req.server.mongo.db!.collection<SubsidiariesFinancialType>(
      CollectionName.investorSubsidiariesFinancial,
    );

    try {
      const result = await subsidiariesFinancialService.deleteSubsidiariesFinancialById(SubsidiariesFinancial, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteItemSubsidiariesFinancialById(req: FastifyRequest, reply: FastifyReply) {
    const { id, objectId } = req.params as { id: string; objectId: string };
    const SubsidiariesFinancial = req.server.mongo.db!.collection<SubsidiariesFinancialType>(
      CollectionName.investorSubsidiariesFinancial,
    );

    try {
      const result = await subsidiariesFinancialService.deleteItemSubsidiariesFinancialById(
        SubsidiariesFinancial,
        objectId,
        id,
      );
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
