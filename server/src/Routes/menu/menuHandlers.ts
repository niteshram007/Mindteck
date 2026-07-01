import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../error/handleError";
import { CollectionName } from "../../constants/collection";
//
import { PositionEnumType, MenuType } from "./menuSchemas";
import { menuService } from "./menuService";

export const menuHandlers = {
  async createMenu(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as MenuType;
    const menuCollection = req.server.mongo.db!.collection<MenuType>(CollectionName.menu);

    try {
      const result = await menuService.createMenu(menuCollection, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateMenu(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedMenu = req.body as MenuType;
    const menu = req.server.mongo.db!.collection<MenuType>(CollectionName.menu);
    try {
      const result = await menuService.updateMenu(menu, updatedMenu, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getMenus(req: FastifyRequest, reply: FastifyReply) {
    const menu = req.server.mongo.db!.collection<MenuType>(CollectionName.menu);
    try {
      const menus = await menuService.getMenus(menu);
      reply.send(menus);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getMenusByPosition(req: FastifyRequest, reply: FastifyReply) {
    const { position } = req.params as { position: PositionEnumType };
    const menu = req.server.mongo.db!.collection<MenuType>(CollectionName.menu);

    try {
      const result = await menuService.getMenusByPosition(menu, position);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getMenusHierarchicallyByPosition(req: FastifyRequest, reply: FastifyReply) {
    const { position } = req.params as { position: PositionEnumType };
    const menu = req.server.mongo.db!.collection<MenuType>(CollectionName.menu);

    try {
      const result = await menuService.getMenusHierarchicallyByPosition(menu, position);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveMenusHierarchicallyByPosition(req: FastifyRequest, reply: FastifyReply) {
    const { position } = req.params as { position: PositionEnumType };
    const menu = req.server.mongo.db!.collection<MenuType>(CollectionName.menu);

    try {
      const result = await menuService.getActiveMenusHierarchicallyByPosition(menu, position);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteMenuById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: PositionEnumType };
    const menu = req.server.mongo.db!.collection<MenuType>(CollectionName.menu);

    try {
      const result = await menuService.deleteMenuById(menu, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
