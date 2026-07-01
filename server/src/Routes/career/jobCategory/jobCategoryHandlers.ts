import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionName } from "../../../constants/collection";
import { handleError } from "../../../error/handleError";
import { JobCategoryType } from "./jobCategorySchemas";
import { jobCategoryService } from "./jobCategoryService";

export const jobCategoryHandlers = {
  async createJobCategory(req: FastifyRequest, reply: FastifyReply) {
    const jobCategoryCollection = req.server.mongo.db!.collection<JobCategoryType>(CollectionName.jobCategory);
    const data = req.body as JobCategoryType;
    try {
      const result = await jobCategoryService.createJobCategory(jobCategoryCollection, data);

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateJobCategory(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const jobCategoryCollection = req.server.mongo.db!.collection<JobCategoryType>(CollectionName.jobCategory);

    try {
      const data = req.body as JobCategoryType;

      const result = await jobCategoryService.updateJobCategory(jobCategoryCollection, data, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getJobCategories(req: FastifyRequest, reply: FastifyReply) {
    const jobCategoryCollection = req.server.mongo.db!.collection<JobCategoryType>(CollectionName.jobCategory);

    try {
      const jobCategories = await jobCategoryService.getJobCategories(jobCategoryCollection);
      reply.send(jobCategories);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteJobCategoryById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const jobCategoryCollection = req.server.mongo.db!.collection<JobCategoryType>(CollectionName.jobCategory);

    try {
      const result = await jobCategoryService.deleteJobCategoryById(jobCategoryCollection, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
