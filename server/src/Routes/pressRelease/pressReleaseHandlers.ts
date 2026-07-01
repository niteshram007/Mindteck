import { FastifyReply, FastifyRequest } from "fastify";
//
import { CollectionName } from "../../constants/collection";
import { handleError } from "../../error/handleError";
import { PressReleaseType } from "./pressReleaseSchemas";
import { pressReleaseService } from "./pressReleaseService";

export const pressReleaseHandlers = {
  async createPressRelease(req: FastifyRequest, reply: FastifyReply) {
    const pressRelease = req.server.mongo.db!.collection<PressReleaseType>(CollectionName.pressRelease);
    const data = req.body as PressReleaseType;
    try {
      const result = await pressReleaseService.createPressRelease(pressRelease, data);

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updatePressRelease(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const pressRelease = req.server.mongo.db!.collection<PressReleaseType>(CollectionName.pressRelease);

    try {
      const fileData = req.body as PressReleaseType;

      const result = await pressReleaseService.updatePressRelease(pressRelease, fileData, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPressReleases(req: FastifyRequest, reply: FastifyReply) {
    const pressRelease = req.server.mongo.db!.collection<PressReleaseType>(CollectionName.pressRelease);

    try {
      const pressReleases = await pressReleaseService.getPressReleases(pressRelease);
      reply.send(pressReleases);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPublishedPressRelease(req: FastifyRequest, reply: FastifyReply) {
    const pressRelease = req.server.mongo.db!.collection<PressReleaseType>(CollectionName.pressRelease);

    try {
      const pressReleases = await pressReleaseService.getPublishedPressRelease(pressRelease);
      reply.send(pressReleases);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deletePressReleaseById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const pressRelease = req.server.mongo.db!.collection<PressReleaseType>(CollectionName.pressRelease);

    try {
      const result = await pressReleaseService.deletePressReleaseById(pressRelease, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPressReleaseById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const pressRelease = req.server.mongo.db!.collection<PressReleaseType>(CollectionName.pressRelease);

    try {
      const result = await pressReleaseService.getPressReleaseById(pressRelease, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPressReleaseByTitle(req: FastifyRequest, reply: FastifyReply) {
    const { title } = req.params as { title: string };
    const pressRelease = req.server.mongo.db!.collection<PressReleaseType>(CollectionName.pressRelease);

    try {
      const result = await pressReleaseService.getPressReleaseByTitle(pressRelease, title);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
