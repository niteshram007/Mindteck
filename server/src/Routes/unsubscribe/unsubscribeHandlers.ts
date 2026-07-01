import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionName } from "../../constants/collection";
import { handleError } from "../../error/handleError";
import { UnsubscribeType } from "./unsubscribeSchemas";
import { UnsubscribeDbType, unsubscribeService } from "./unsubscribeService";

export const unsubscribeHandlers = {
  async createUnsubscribe(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as UnsubscribeType;
    const unsubscribe = req.server.mongo.db!.collection<UnsubscribeDbType>(
      CollectionName.unsubscribe,
    );
    const contact = req.server.mongo.db!.collection<{
      email?: string;
      emailOptIn?: boolean;
      marketingUpdates?: boolean;
      updatedAt?: Date;
    }>(CollectionName.contact);

    try {
      const result = await unsubscribeService.createOrUpdateUnsubscribe(
        unsubscribe,
        contact,
        data,
      );
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
