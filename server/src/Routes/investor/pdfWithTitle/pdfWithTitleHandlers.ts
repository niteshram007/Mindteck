import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { pdfTitleType, PdfWithTitleType } from "./pdfWithTitleSchemas";
import { PdfWithTitleService } from "./pdfWithTitleService";
import { saveFileService } from "../../../utils/service";

export const PdfWithTitleHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorPdfWithTitle, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },
  async createPdfWithTitle(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as PdfWithTitleType;
    const PdfWithTitle = req.server.mongo.db!.collection<PdfWithTitleType>(CollectionName.investorPdfWithTitle);

    try {
      const result = await PdfWithTitleService.createPdfWithTitle(PdfWithTitle, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updatePdfWithTitle(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedPdfWithTitle = req.body as PdfWithTitleType;
    const PdfWithTitle = req.server.mongo.db!.collection<PdfWithTitleType>(CollectionName.investorPdfWithTitle);
    try {
      const result = await PdfWithTitleService.updatePdfWithTitle(PdfWithTitle, updatedPdfWithTitle, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPdfWithTitle(req: FastifyRequest, reply: FastifyReply) {
    const PdfWithTitle = req.server.mongo.db!.collection<PdfWithTitleType>(CollectionName.investorPdfWithTitle);
    try {
      const pdfWithTitle = await PdfWithTitleService.getPdfWithTitle(PdfWithTitle);
      reply.send(pdfWithTitle);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPdfWithTitleByType(req: FastifyRequest, reply: FastifyReply) {
    const PdfWithTitle = req.server.mongo.db!.collection<PdfWithTitleType>(CollectionName.investorPdfWithTitle);
    const { type } = req.params as { type: pdfTitleType };
    try {
      const pdfWithTitle = await PdfWithTitleService.getPdfWithTitleByType(PdfWithTitle, type);
      reply.send(pdfWithTitle);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActivePdfWithTitle(req: FastifyRequest, reply: FastifyReply) {
    const PdfWithTitle = req.server.mongo.db!.collection<PdfWithTitleType>(CollectionName.investorPdfWithTitle);
    try {
      const pdfWithTitle = await PdfWithTitleService.getActivePdfWithTitle(PdfWithTitle);
      reply.send(pdfWithTitle);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActivePdfWithTitleByType(req: FastifyRequest, reply: FastifyReply) {
    const PdfWithTitle = req.server.mongo.db!.collection<PdfWithTitleType>(CollectionName.investorPdfWithTitle);
    const { type } = req.params as { type: pdfTitleType };
    try {
      const pdfWithTitle = await PdfWithTitleService.getActivePdfWithTitleByType(PdfWithTitle, type);
      reply.send(pdfWithTitle);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deletePdfWithTitleById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const PdfWithTitle = req.server.mongo.db!.collection<PdfWithTitleType>(CollectionName.investorPdfWithTitle);

    try {
      const result = await PdfWithTitleService.deletePdfWithTitleById(PdfWithTitle, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
