import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../error/handleError";
import { CollectionName } from "../../constants/collection";
import { MainLocationType } from "./mainLocationSchemas";
import { mainLocationService } from "./mainLocationService";

export const mainLocationHandlers = {
  async createMainLocation(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as MainLocationType;
    const mainLocation = req.server.mongo.db!.collection<MainLocationType>(CollectionName.main_location);

    try {
      const result = await mainLocationService.createMainLocation(mainLocation, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateMainLocation(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedMain = req.body as MainLocationType;
    const mainLocation = req.server.mongo.db!.collection<MainLocationType>(CollectionName.main_location);
    try {
      const result = await mainLocationService.updateMainLocation(mainLocation, updatedMain, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getMainLocations(req: FastifyRequest, reply: FastifyReply) {
    const mainLocation = req.server.mongo.db!.collection<MainLocationType>(CollectionName.main_location);
    try {
      const mainLocations = await mainLocationService.getMainLocations(mainLocation);
      reply.send(mainLocations);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveMainLocations(req: FastifyRequest, reply: FastifyReply) {
    const mainLocation = req.server.mongo.db!.collection<MainLocationType>(CollectionName.main_location);
    try {
      const mainLocations = await mainLocationService.getActiveMainLocations(mainLocation);
      reply.send(mainLocations);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteMainLocationById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const mainLocation = req.server.mongo.db!.collection<MainLocationType>(CollectionName.main_location);

    try {
      const result = await mainLocationService.deleteMainLocationById(mainLocation, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
