import { FastifyReply, FastifyRequest } from "fastify";
import { UserType } from "./userSchemas";
import { handleError } from "../../error/handleError";
import { userService } from "./userService";
import { CollectionName } from "../../constants/collection";

export const userHandlers = {
  async createUser(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as UserType;
    const user = req.server.mongo.db!.collection<UserType>(CollectionName.user);

    try {
      const result = await userService.createUser(user, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedUser = req.body as UserType;
    const user = req.server.mongo.db!.collection<UserType>(CollectionName.user);

    try {
      const result = await userService.updateUser(user, id, updatedUser);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getUsers(req: FastifyRequest, reply: FastifyReply) {
    const user = req.server.mongo.db!.collection<UserType>(CollectionName.user);
    try {
      const users = await userService.getUsers(user);
      reply.send(users);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getUserById(req: FastifyRequest, reply: FastifyReply) {
    const user = req.server.mongo.db!.collection<UserType>(CollectionName.user);
    const { id } = req.params as { id: string };
    try {
      const users = await userService.getUserById(user, id);
      reply.send(users);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteUser(req: FastifyRequest, reply: FastifyReply) {
    const user = req.server.mongo.db!.collection<UserType>(CollectionName.user);
    const { id } = req.params as { id: string };
    try {
      const result = await userService.deleteUser(user, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
