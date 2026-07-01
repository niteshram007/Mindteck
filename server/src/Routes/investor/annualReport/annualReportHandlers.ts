import { FastifyReply, FastifyRequest } from "fastify";
//
import { handleError } from "../../../error/handleError";
import { CollectionName } from "../../../constants/collection";
import { AnnualReportType, AnnualReportUpdateType } from "../annualReport/annualReportSchemas";
import { annualReportService } from "../annualReport/annualReportService";
import { saveFileService } from "../../../utils/service";

const collection = CollectionName.investorAnnualReport;

export const annualReportHandlers = {
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.investorAnnualReport, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
  },

  async createAnnualReport(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as AnnualReportType;
    const annualReport = req.server.mongo.db!.collection<AnnualReportType>(collection);

    try {
      const result = await annualReportService.createAnnualReport(annualReport, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateAnnualReport(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const annualReportUpdate = req.body as AnnualReportUpdateType;
    const annualReport = req.server.mongo.db!.collection<AnnualReportType>(collection);
    try {
      const result = await annualReportService.updateAnnualReport(annualReport, annualReportUpdate, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getAnnualReports(req: FastifyRequest, reply: FastifyReply) {
    const annualReport = req.server.mongo.db!.collection<AnnualReportType>(collection);
    try {
      const policyCategories = await annualReportService.getAnnualReports(annualReport);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getBySession(req: FastifyRequest, reply: FastifyReply) {
    const annualReport = req.server.mongo.db!.collection<AnnualReportType>(collection);
    const { session } = req.query as { session: string | undefined };
    try {
      const policyCategories = await annualReportService.getBySession(annualReport, session);
      reply.send(policyCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteAnnualReportById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const annualReport = req.server.mongo.db!.collection<AnnualReportType>(collection);

    try {
      const result = await annualReportService.deleteAnnualReportById(annualReport, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteItemAnnualReportById(req: FastifyRequest, reply: FastifyReply) {
    const { objectId, id } = req.params as { objectId: string; id: string };
    const annualReport = req.server.mongo.db!.collection<AnnualReportType>(collection);

    try {
      const result = await annualReportService.deleteItemAnnualReportById(annualReport, objectId, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
