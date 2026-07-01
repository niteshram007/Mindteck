import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../error/handleError";
import { pageService } from "./pageService";
import { CollectionName } from "../../constants/collection";

import { PageType } from "./pageSchemas";
import { TemplateCreateType } from "../template/templateSchemas";
import { saveFileService } from "../../utils/service";

export const pageHandlers = {
  async createPage(req: FastifyRequest, reply: FastifyReply) {
    const page = req.server.mongo.db!.collection<PageType>(CollectionName.page);
    const data = req.body as PageType;
    try {
      const result = await pageService.createPage(page, data);

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.page, ["image/jpeg", "image/png", "application/pdf"]);
  },

  async updatePage(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const page = req.server.mongo.db!.collection<PageType>(CollectionName.page);

    try {
      const fileData = req.body as PageType;

      const result = await pageService.updatePage(page, fileData, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPages(req: FastifyRequest, reply: FastifyReply) {
    const page = req.server.mongo.db!.collection<PageType>(CollectionName.page);

    try {
      const pages = await pageService.getPages(page);
      reply.send(pages);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getTemplateByUrl(req: FastifyRequest, reply: FastifyReply) {
    const { url } = req.body as { url: string };
    const page = req.server.mongo.db!.collection<PageType>(CollectionName.page);
    const template = req.server.mongo.db!.collection<TemplateCreateType>(CollectionName.template);
    try {
      const result = await pageService.getTemplateByUrl(page, template, url);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveTemplateByUrl(req: FastifyRequest, reply: FastifyReply) {
    const { url } = req.body as { url: string };
    const page = req.server.mongo.db!.collection<PageType>(CollectionName.page);
    const template = req.server.mongo.db!.collection<TemplateCreateType>(CollectionName.template);
    try {
      const result = await pageService.getActiveTemplateByUrl(page, template, url);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async searchPages(req: FastifyRequest, reply: FastifyReply) {
    const { q, limit } = req.query as { q?: string; limit?: string };
    const query = (q ?? "").trim();
    const limitValue = Math.min(Math.max(parseInt(limit ?? "10", 10) || 10, 1), 20);

    if (!query || query.length < 2) {
      reply.send({ data: [] });
      return;
    }

    const page = req.server.mongo.db!.collection<PageType>(CollectionName.page);
    const template = req.server.mongo.db!.collection<TemplateCreateType>(CollectionName.template);
    try {
      const results = await pageService.searchPages(page, template, query, limitValue);
      reply.send({ data: results });
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deletePageById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const page = req.server.mongo.db!.collection<PageType>(CollectionName.page);

    try {
      const result = await pageService.deletePageById(page, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
