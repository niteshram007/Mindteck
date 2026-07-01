import { FastifyReply, FastifyRequest } from "fastify";
//
import { bodService } from "./bodService";
import { BodCategoryType, BodType } from "./bodSchemas";
import { handleError } from "../../error/handleError";
import { CollectionName } from "../../constants/collection";
import { saveFileService } from "../../utils/service";

export const bodHandlers = {
  async uploadBodImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.bod);
  },

  async createBod(req: FastifyRequest, reply: FastifyReply) {
    const bod = req.server.mongo.db!.collection<BodType>(CollectionName.bod);
    const data = req.body as BodType;
    try {
      const result = await bodService.createBod(bod, data);

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateBod(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const bod = req.server.mongo.db!.collection<BodType>(CollectionName.bod);

    try {
      const fileData = req.body as BodType;

      const result = await bodService.updateBod(bod, fileData, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBodsByCategory(req: FastifyRequest, reply: FastifyReply) {
    const bod = req.server.mongo.db!.collection<BodType>(CollectionName.bod);

    const { category } = req.query as { category: BodCategoryType | undefined };

    try {
      const bods = await bodService.getBodsByCategory(bod, category);
      reply.send(bods);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveBodsByCategory(req: FastifyRequest, reply: FastifyReply) {
    const bod = req.server.mongo.db!.collection<BodType>(CollectionName.bod);

    const { category } = req.query as { category: BodCategoryType | undefined };

    try {
      const bods = await bodService.getActiveBodsByCategory(bod, category);
      reply.send(bods);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBodById(req: FastifyRequest, reply: FastifyReply) {
    const bod = req.server.mongo.db!.collection<BodType>(CollectionName.bod);
    const { id } = req.params as { id: string };
    try {
      const bods = await bodService.getBodById(bod, id);
      reply.send(bods);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteBodById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const bod = req.server.mongo.db!.collection<BodType>(CollectionName.bod);

    try {
      const result = await bodService.deleteBodById(bod, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
