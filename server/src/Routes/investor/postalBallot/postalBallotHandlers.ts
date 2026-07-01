import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { PostalBallotType, PostalBallotUpdateType } from "./postalBallotSchemas";
import { postalBallotService } from "./postalBallotService";
import { saveFileService } from "../../../utils/service";

export const PostalBallotHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorPostalBallot, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },

  async createPostalBallot(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as PostalBallotType;
    const PostalBallot = req.server.mongo.db!.collection<PostalBallotType>(CollectionName.investorPostalBallot);

    try {
      const result = await postalBallotService.createPostalBallot(PostalBallot, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updatePostalBallot(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const postalBallotUpdate = req.body as PostalBallotUpdateType;
    const PostalBallot = req.server.mongo.db!.collection<PostalBallotType>(CollectionName.investorPostalBallot);
    try {
      const result = await postalBallotService.updatePostalBallot(PostalBallot, postalBallotUpdate, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPostalBallot(req: FastifyRequest, reply: FastifyReply) {
    const PostalBallot = req.server.mongo.db!.collection<PostalBallotType>(CollectionName.investorPostalBallot);
    try {
      const postalBallot = await postalBallotService.getPostalBallot(PostalBallot);
      reply.send(postalBallot);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActivePostalBallot(req: FastifyRequest, reply: FastifyReply) {
    const PostalBallot = req.server.mongo.db!.collection<PostalBallotType>(CollectionName.investorPostalBallot);
    try {
      const postalBallot = await postalBallotService.getActivePostalBallot(PostalBallot);
      reply.send(postalBallot);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deletePostalBallotById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const PostalBallot = req.server.mongo.db!.collection<PostalBallotType>(CollectionName.investorPostalBallot);

    try {
      const result = await postalBallotService.deletePostalBallotById(PostalBallot, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteItemPostalBallotById(req: FastifyRequest, reply: FastifyReply) {
    const { objectId, id } = req.params as { objectId: string; id: string };
    const PostalBallot = req.server.mongo.db!.collection<PostalBallotType>(CollectionName.investorPostalBallot);

    try {
      const result = await postalBallotService.deleteItemPostalBallotById(PostalBallot, objectId, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
