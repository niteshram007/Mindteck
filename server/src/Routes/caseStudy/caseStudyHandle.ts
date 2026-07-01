import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../error/handleError";
import { caseStudyService } from "./caseStudyService";
import { CollectionName } from "../../constants/collection";
import { CaseStudyType } from "./caseStudySchemas";
import { saveFileService } from "../../utils/service";

export const caseStudyHandlers = {
  async uploadCaseStudyImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.caseStudy);
  },

  async createCaseStudy(req: FastifyRequest, reply: FastifyReply) {
    const caseStudy = req.server.mongo.db!.collection<CaseStudyType>(CollectionName.caseStudy);
    const data = req.body as CaseStudyType;
    try {
      const result = await caseStudyService.createCaseStudy(caseStudy, data);

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateCaseStudy(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const caseStudy = req.server.mongo.db!.collection<CaseStudyType>(CollectionName.caseStudy);

    try {
      const fileData = req.body as CaseStudyType;

      const result = await caseStudyService.updateCaseStudy(caseStudy, fileData, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getCaseStudies(req: FastifyRequest, reply: FastifyReply) {
    const caseStudy = req.server.mongo.db!.collection<CaseStudyType>(CollectionName.caseStudy);

    try {
      const caseStudies = await caseStudyService.getCaseStudies(caseStudy);
      reply.send(caseStudies);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getSingleCaseStudy(req: FastifyRequest, reply: FastifyReply) {
    const caseStudy = req.server.mongo.db!.collection<CaseStudyType>(CollectionName.caseStudy);
    const { id } = req.params as { id: string };
    try {
      const caseStudyData = await caseStudyService.getCaseStudyById(caseStudy, id);
      reply.send(caseStudyData);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getCaseStudyByTitle(req: FastifyRequest, reply: FastifyReply) {
    const caseStudy = req.server.mongo.db!.collection<CaseStudyType>(CollectionName.caseStudy);
    const { title } = req.params as { title: string };
    try {
      const caseStudyData = await caseStudyService.getCaseStudyByTitle(caseStudy, title);
      reply.send(caseStudyData);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveCaseStudyByTitle(req: FastifyRequest, reply: FastifyReply) {
    const caseStudy = req.server.mongo.db!.collection<CaseStudyType>(CollectionName.caseStudy);
    const { title } = req.params as { title: string };
    try {
      const caseStudyData = await caseStudyService.getActiveCaseStudyByTitle(caseStudy, title);
      reply.send(caseStudyData);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getCaseStudiesByCategories(req: FastifyRequest, reply: FastifyReply) {
    const caseStudy = req.server.mongo.db!.collection<CaseStudyType>(CollectionName.caseStudy);
    const { categories } = req.body as { categories: string[] };

    try {
      const caseStudies = await caseStudyService.getCaseStudiesByCategories(caseStudy, categories);
      reply.send(caseStudies);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getActiveCaseStudiesByCategories(req: FastifyRequest, reply: FastifyReply) {
    const caseStudy = req.server.mongo.db!.collection<CaseStudyType>(CollectionName.caseStudy);
    const { categories } = req.body as { categories: string[] };

    try {
      const caseStudies = await caseStudyService.getActiveCaseStudiesByCategories(caseStudy, categories);
      reply.send(caseStudies);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteCaseStudyById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const caseStudy = req.server.mongo.db!.collection<CaseStudyType>(CollectionName.caseStudy);

    try {
      const result = await caseStudyService.deleteCaseStudyById(caseStudy, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
