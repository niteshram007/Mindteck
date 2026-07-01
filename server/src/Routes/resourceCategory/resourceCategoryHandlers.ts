import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionName } from "../../constants/collection";
import { handleError } from "../../error/handleError";
import { resourceCategoryService } from "./resourceCategoryService";
import { ResourceCategoryType } from "./resourceCategorySchemas";

export const resourceCategoryHandlers = {
  async createResourceCategory(req: FastifyRequest, reply: FastifyReply) {
    const resourceCategoryCollection = req.server.mongo
      .db!
      .collection<ResourceCategoryType>(CollectionName.resourceCategory);
    const data = req.body as ResourceCategoryType;

    try {
      const result = await resourceCategoryService.createResourceCategory(
        resourceCategoryCollection,
        data,
      );
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateResourceCategory(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const resourceCategoryCollection = req.server.mongo
      .db!
      .collection<ResourceCategoryType>(CollectionName.resourceCategory);

    try {
      const data = req.body as ResourceCategoryType;
      const result = await resourceCategoryService.updateResourceCategory(
        resourceCategoryCollection,
        data,
        id,
      );
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getResourceCategories(req: FastifyRequest, reply: FastifyReply) {
    const resourceCategoryCollection = req.server.mongo
      .db!
      .collection<ResourceCategoryType>(CollectionName.resourceCategory);

    try {
      const categories = await resourceCategoryService.getResourceCategories(
        resourceCategoryCollection,
      );
      reply.send(categories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveResourceCategories(req: FastifyRequest, reply: FastifyReply) {
    const resourceCategoryCollection = req.server.mongo
      .db!
      .collection<ResourceCategoryType>(CollectionName.resourceCategory);

    try {
      const categories = await resourceCategoryService.getActiveResourceCategories(
        resourceCategoryCollection,
      );
      reply.send(categories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteResourceCategoryById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const resourceCategoryCollection = req.server.mongo
      .db!
      .collection<ResourceCategoryType>(CollectionName.resourceCategory);

    try {
      const result = await resourceCategoryService.deleteResourceCategoryById(
        resourceCategoryCollection,
        id,
      );
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
