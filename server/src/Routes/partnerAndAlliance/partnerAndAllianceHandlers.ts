import { FastifyReply, FastifyRequest } from "fastify";
//
import { partnerAndAllianceService } from "./partnerAndAllianceService";
import { PartnerAndAllianceType } from "./partnerAndAllianceSchemas";
import { handleError } from "../../error/handleError";
import { CollectionName } from "../../constants/collection";
import { saveFileService } from "../../utils/service";

export const partnerAndAllianceHandlers = {
  async uploadPartnerAndAllianceImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.partnerAndAlliance);
  },

  async createPartnerAndAlliance(req: FastifyRequest, reply: FastifyReply) {
    const partnerAndAlliance = req.server.mongo.db!.collection<PartnerAndAllianceType>(
      CollectionName.partnerAndAlliance,
    );
    const data = req.body as PartnerAndAllianceType;
    try {
      const result = await partnerAndAllianceService.createPartnerAndAlliance(partnerAndAlliance, data);

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updatePartnerAndAlliance(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const partnerAndAlliance = req.server.mongo.db!.collection<PartnerAndAllianceType>(
      CollectionName.partnerAndAlliance,
    );

    try {
      const fileData = req.body as PartnerAndAllianceType;

      const result = await partnerAndAllianceService.updatePartnerAndAlliance(partnerAndAlliance, fileData, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPartnerAndAlliances(req: FastifyRequest, reply: FastifyReply) {
    const partnerAndAlliance = req.server.mongo.db!.collection<PartnerAndAllianceType>(
      CollectionName.partnerAndAlliance,
    );

    try {
      const partnerAndAlliances = await partnerAndAllianceService.getPartnerAndAlliances(partnerAndAlliance);
      reply.send(partnerAndAlliances);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActivePartnerAndAlliances(req: FastifyRequest, reply: FastifyReply) {
    const partnerAndAlliance = req.server.mongo.db!.collection<PartnerAndAllianceType>(
      CollectionName.partnerAndAlliance,
    );

    try {
      const partnerAndAlliances = await partnerAndAllianceService.getActivePartnerAndAlliances(partnerAndAlliance);
      reply.send(partnerAndAlliances);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deletePartnerAndAllianceById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const partnerAndAlliance = req.server.mongo.db!.collection<PartnerAndAllianceType>(
      CollectionName.partnerAndAlliance,
    );

    try {
      const result = await partnerAndAllianceService.deletePartnerAndAllianceById(partnerAndAlliance, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
