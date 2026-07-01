import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import {
  ShareHoldingPatternQuarterEnumType,
  ShareHoldingPatternQuarterType,
  ShareHoldingPatternType,
} from "./shareHoldingPatternSchemas";
import { shareHoldingPatternService } from "./shareHoldingPatternService";
import { saveFileService } from "../../../utils/service";

export const ShareHoldingPatternHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorShareHoldingPattern, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },
  async createShareHoldingPattern(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as ShareHoldingPatternType;
    const ShareHoldingPattern = req.server.mongo.db!.collection<ShareHoldingPatternType>(
      CollectionName.investorShareHoldingPattern,
    );

    try {
      const result = await shareHoldingPatternService.createShareHoldingPattern(ShareHoldingPattern, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateShareHoldingPattern(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const shareHoldingPatternQuarterUpdate = req.body as ShareHoldingPatternQuarterType;
    const ShareHoldingPattern = req.server.mongo.db!.collection<ShareHoldingPatternType>(
      CollectionName.investorShareHoldingPattern,
    );
    try {
      const result = await shareHoldingPatternService.updateShareHoldingPattern(
        ShareHoldingPattern,
        shareHoldingPatternQuarterUpdate,
        id,
      );
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getShareHoldingPattern(req: FastifyRequest, reply: FastifyReply) {
    const ShareHoldingPattern = req.server.mongo.db!.collection<ShareHoldingPatternType>(
      CollectionName.investorShareHoldingPattern,
    );
    try {
      const shareHoldingPattern = await shareHoldingPatternService.getShareHoldingPattern(ShareHoldingPattern);
      reply.send(shareHoldingPattern);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBySessionShareHoldingPattern(req: FastifyRequest, reply: FastifyReply) {
    const ShareHoldingPattern = req.server.mongo.db!.collection<ShareHoldingPatternType>(
      CollectionName.investorShareHoldingPattern,
    );
    const { session } = req.query as { session: string | undefined };
    try {
      const shareHoldingPattern = await shareHoldingPatternService.getBySessionShareHoldingPattern(
        ShareHoldingPattern,
        session,
      );
      reply.send(shareHoldingPattern);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveShareHoldingPattern(req: FastifyRequest, reply: FastifyReply) {
    const ShareHoldingPattern = req.server.mongo.db!.collection<ShareHoldingPatternType>(
      CollectionName.investorShareHoldingPattern,
    );
    try {
      const shareHoldingPattern = await shareHoldingPatternService.getActiveShareHoldingPattern(ShareHoldingPattern);
      reply.send(shareHoldingPattern);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteShareHoldingPatternById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const ShareHoldingPattern = req.server.mongo.db!.collection<ShareHoldingPatternType>(
      CollectionName.investorShareHoldingPattern,
    );

    try {
      const result = await shareHoldingPatternService.deleteShareHoldingPatternById(ShareHoldingPattern, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteItemShareHoldingPatternById(req: FastifyRequest, reply: FastifyReply) {
    const { objectId, quarterName } = req.params as {
      objectId: string;
      quarterName: ShareHoldingPatternQuarterEnumType;
    };
    const ShareHoldingPattern = req.server.mongo.db!.collection<ShareHoldingPatternType>(
      CollectionName.investorShareHoldingPattern,
    );

    try {
      const result = await shareHoldingPatternService.deleteItemShareHoldingPatternById(
        ShareHoldingPattern,
        objectId,
        quarterName,
      );
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
