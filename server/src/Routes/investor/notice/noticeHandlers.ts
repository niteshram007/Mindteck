import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { NoticeType, NoticeUpdateType } from "../notice/noticeSchemas";
import { noticeService } from "../notice/noticeService";
import { saveFileService } from "../../../utils/service";

const collection = CollectionName.investorNotice;

export const noticeHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorNotice, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },

  async createNotice(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as NoticeType;
    const notice = req.server.mongo.db!.collection<NoticeType>(collection);

    try {
      const result = await noticeService.createNotice(notice, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateNotice(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const noticeUpdate = req.body as NoticeUpdateType;
    const notice = req.server.mongo.db!.collection<NoticeType>(collection);
    try {
      const result = await noticeService.updateNotice(notice, noticeUpdate, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getNotices(req: FastifyRequest, reply: FastifyReply) {
    const notice = req.server.mongo.db!.collection<NoticeType>(collection);
    try {
      const policyCategories = await noticeService.getNotices(notice);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBySession(req: FastifyRequest, reply: FastifyReply) {
    const notice = req.server.mongo.db!.collection<NoticeType>(collection);
    const { session } = req.query as { session: string | undefined };
    try {
      const policyCategories = await noticeService.getBySession(notice, session);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteNoticeById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const notice = req.server.mongo.db!.collection<NoticeType>(collection);

    try {
      const result = await noticeService.deleteNoticeById(notice, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteItemNoticeById(req: FastifyRequest, reply: FastifyReply) {
    const { objectId, id } = req.params as { objectId: string; id: string };
    const notice = req.server.mongo.db!.collection<NoticeType>(collection);

    try {
      const result = await noticeService.deleteItemNoticeById(notice, objectId, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
