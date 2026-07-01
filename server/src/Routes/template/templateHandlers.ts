import { FastifyReply, FastifyRequest } from "fastify";
//
import { CollectionName } from "../../constants/collection";
import { handleError } from "../../error/handleError";
import { templateService } from "./templateService";
import { TemplateCreateType,TemplateUpdateType } from "./templateSchemas";

export const templateHandlers = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as TemplateCreateType;

      const template = request.server.mongo.db!.collection<TemplateCreateType>(CollectionName.template);
      const result = await templateService.create(template, body);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, request);
    }
  },

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as TemplateUpdateType;

      const template = request.server.mongo.db!.collection<TemplateUpdateType>(CollectionName.template);
      const result = await templateService.update(template, body);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, request);
    }
  },
};
