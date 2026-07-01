import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../error/handleError";
import { brochureService } from "./brochureService";
import { CollectionName } from "../../constants/collection";
import { BrochureType } from "./brochureSchemas";
import { saveFileService } from "../../utils/service";

export const brochureHandlers = {
  async uploadBrochureFile(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.brochure);
  },

  async createBrochure(req: FastifyRequest, reply: FastifyReply) {
    const brochureCollection = req.server.mongo
      .db!
      .collection<BrochureType>(CollectionName.brochure);
    const data = req.body as BrochureType;
    try {
      const result = await brochureService.createBrochure(
        brochureCollection,
        data,
      );

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateBrochure(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const brochureCollection = req.server.mongo
      .db!
      .collection<BrochureType>(CollectionName.brochure);

    try {
      const brochureData = req.body as BrochureType;

      const result = await brochureService.updateBrochure(
        brochureCollection,
        brochureData,
        id,
      );
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBrochures(req: FastifyRequest, reply: FastifyReply) {
    const brochureCollection = req.server.mongo
      .db!
      .collection<BrochureType>(CollectionName.brochure);

    try {
      const brochures = await brochureService.getBrochures(brochureCollection);
      reply.send(brochures);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBrochureById(req: FastifyRequest, reply: FastifyReply) {
    const brochureCollection = req.server.mongo
      .db!
      .collection<BrochureType>(CollectionName.brochure);
    const { id } = req.params as { id: string };
    try {
      const brochureData = await brochureService.getBrochureById(
        brochureCollection,
        id,
      );
      reply.send(brochureData);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBrochureByTitle(req: FastifyRequest, reply: FastifyReply) {
    const brochureCollection = req.server.mongo
      .db!
      .collection<BrochureType>(CollectionName.brochure);
    const { title } = req.params as { title: string };
    try {
      const brochureData = await brochureService.getBrochureByTitle(
        brochureCollection,
        title,
      );
      reply.send(brochureData);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveBrochureByTitle(req: FastifyRequest, reply: FastifyReply) {
    const brochureCollection = req.server.mongo
      .db!
      .collection<BrochureType>(CollectionName.brochure);
    const { title } = req.params as { title: string };
    try {
      const brochureData = await brochureService.getActiveBrochureByTitle(
        brochureCollection,
        title,
      );
      reply.send(brochureData);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveBrochuresByResourceCategory(
    req: FastifyRequest,
    reply: FastifyReply,
  ) {
    const brochureCollection = req.server.mongo
      .db!
      .collection<BrochureType>(CollectionName.brochure);
    const { categoryId } = req.body as { categoryId: string };

    try {
      const brochures =
        await brochureService.getActiveBrochuresByResourceCategory(
          brochureCollection,
          categoryId,
        );
      reply.send(brochures);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteBrochureById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const brochureCollection = req.server.mongo
      .db!
      .collection<BrochureType>(CollectionName.brochure);

    try {
      const result = await brochureService.deleteBrochureById(
        brochureCollection,
        id,
      );
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
