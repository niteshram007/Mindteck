import { FastifyReply, FastifyRequest } from "fastify";
import { ContactType } from "./contactSchemas";
import { handleError } from "../../error/handleError";
import { ContactDbType, contactService } from "./contactService";
import { CollectionName } from "../../constants/collection";

export const contactHandlers = {
  async createContact(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as ContactType;
    const contact = req.server.mongo.db!.collection<ContactDbType>(CollectionName.contact);

    try {
      const result = await contactService.createContact(contact, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getContacts(req: FastifyRequest, reply: FastifyReply) {
    const contact = req.server.mongo.db!.collection<ContactDbType>(CollectionName.contact);
    const unsubscribe = req.server.mongo.db!.collection<{ email: string }>(CollectionName.unsubscribe);

    try {
      const users = await contactService.getContacts(contact, unsubscribe);
      reply.send(users);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getContactById(req: FastifyRequest, reply: FastifyReply) {
    const contact = req.server.mongo.db!.collection<ContactDbType>(CollectionName.contact);
    const { id } = req.params as { id: string };
    try {
      const users = await contactService.getContactById(contact, id);
      reply.send(users);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteContact(req: FastifyRequest, reply: FastifyReply) {
    const contact = req.server.mongo.db!.collection<ContactDbType>(CollectionName.contact);
    const { id } = req.params as { id: string };
    try {
      const result = await contactService.deleteContact(contact, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteBulkContact(req: FastifyRequest, reply: FastifyReply) {
    const contact = req.server.mongo.db!.collection<ContactDbType>(CollectionName.contact);
    const { ids } = req.body as { ids: string[] };
    try {
      const result = await contactService.deleteBulkContact(contact, ids);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
