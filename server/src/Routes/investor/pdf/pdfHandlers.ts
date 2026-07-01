import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { PdfType } from "./pdfSchemas";
import { pdfService } from "./pdfService";
import { saveFileService } from "../../../utils/service";

export const PdfHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorNotice, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },

  async createPdf(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as PdfType;
    const Pdf = req.server.mongo.db!.collection<PdfType>(CollectionName.investorPdf);

    try {
      const result = await pdfService.createPdf(Pdf, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updatePdf(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedPdf = req.body as PdfType;
    const Pdf = req.server.mongo.db!.collection<PdfType>(CollectionName.investorPdf);
    try {
      const result = await pdfService.updatePdf(Pdf, updatedPdf, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getPdf(req: FastifyRequest, reply: FastifyReply) {
    const Pdf = req.server.mongo.db!.collection<PdfType>(CollectionName.investorPdf);
    try {
      const pdf = await pdfService.getPdf(Pdf);
      reply.send(pdf);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActivePdf(req: FastifyRequest, reply: FastifyReply) {
    const Pdf = req.server.mongo.db!.collection<PdfType>(CollectionName.investorPdf);
    try {
      const pdf = await pdfService.getActivePdf(Pdf);
      reply.send(pdf);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deletePdfById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const Pdf = req.server.mongo.db!.collection<PdfType>(CollectionName.investorPdf);

    try {
      const result = await pdfService.deletePdfById(Pdf, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
