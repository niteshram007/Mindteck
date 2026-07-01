import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../error/handleError";
import { officeService } from "./officeService";
import { CollectionName } from "../../constants/collection";

import { OfficeType } from "./officeSchemas";
import { saveFileService } from "../../utils/service";

export const officeHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.office);
  },

  async createOffice(req: FastifyRequest, reply: FastifyReply) {
    const office = req.server.mongo.db!.collection<OfficeType>(CollectionName.office);
    const data = req.body as OfficeType;
    try {
      const result = await officeService.createOffice(office, data);

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateOffice(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const office = req.server.mongo.db!.collection<OfficeType>(CollectionName.office);

    try {
      const fileData = req.body as OfficeType;

      const result = await officeService.updateOffice(office, fileData, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getOffices(req: FastifyRequest, reply: FastifyReply) {
    const office = req.server.mongo.db!.collection<OfficeType>(CollectionName.office);

    try {
      const offices = await officeService.getOffices(office);
      reply.send(offices);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getOfficesByMainLocation(req: FastifyRequest, reply: FastifyReply) {
    const { locationId } = req.params as { locationId: string };
    const office = req.server.mongo.db!.collection<OfficeType>(CollectionName.office);

    try {
      const result = await officeService.getOfficesByMainLocation(office, locationId);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
  async getActiveOfficesByMainLocation(req: FastifyRequest, reply: FastifyReply) {
    const { locationId } = req.params as { locationId: string };
    const office = req.server.mongo.db!.collection<OfficeType>(CollectionName.office);

    try {
      const result = await officeService.getActiveOfficesByMainLocation(office, locationId);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteOfficeById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const office = req.server.mongo.db!.collection<OfficeType>(CollectionName.office);

    try {
      const result = await officeService.deleteOfficeById(office, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
