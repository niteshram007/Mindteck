import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionName } from "../../../constants/collection";
import { handleError } from "../../../error/handleError";
import { jobReviewStatusType, JobStatusType, JobType, jobTypeType, JobUpdateType } from "./jobSchemas";
import { jobService } from "./jobService";

export const jobHandlers = {
  async createJob(req: FastifyRequest, reply: FastifyReply) {
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);
    const data = req.body as JobType;
    const { id: userId } = req.jwtPayload;
    try {
      const result = await jobService.createJob(jobCollection, userId, data);
      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateJob(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);

    try {
      const data = req.body as JobUpdateType;

      const result = await jobService.updateJob(jobCollection, data, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getJobs(req: FastifyRequest, reply: FastifyReply) {
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);
    const { page, pageSize, categoryId, reviewStatus, searchTerm } = req.query as {
      page: string;
      pageSize: string;
      categoryId: string | undefined;
      reviewStatus: string | undefined;
      searchTerm:string | undefined;
    };

    try {
      const currentPage = parseInt(page) || 1;
      const currentPageSize = parseInt(pageSize) || 10;
      const jobs = await jobService.getJobs(jobCollection, currentPage, currentPageSize, categoryId, reviewStatus, searchTerm);
      reply.send(jobs);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getJobActiveJobs(req: FastifyRequest, reply: FastifyReply) {
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);
    const { page, pageSize, categoryId, jobType, experience, city, keyword } = req.query as {
      page: string;
      pageSize: string;
      categoryId: string | undefined;
      jobType: jobTypeType[] | undefined;
      experience: number | undefined;
      city: string | undefined;
      keyword: string | undefined;
    };

    try {
      const currentPage = parseInt(page) || 1;
      const currentPageSize = parseInt(pageSize) || 10;
      const jobs = await jobService.getJobActiveJobs(
        jobCollection,
        currentPage,
        currentPageSize,
        categoryId,
        jobType,
        experience,
        city,
        keyword,
      );
      reply.send(jobs);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getJobsWithApplicationCount(req: FastifyRequest, reply: FastifyReply) {
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);

    try {
      const jobs = await jobService.getJobsWithApplicationCount(jobCollection);
      reply.send(jobs);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getJobsByUserIdWithApplicationCount(req: FastifyRequest, reply: FastifyReply) {
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);
    const { categoryId } = req.query as { categoryId: string | undefined };
    const userId = req.jwtPayload.id;
    try {
      const jobs = await jobService.getJobsByUserIdWithApplicationCount(jobCollection, userId, categoryId);
      reply.send(jobs);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getJobById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);

    try {
      const result = await jobService.getJobById(jobCollection, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getJobByJobCode(req: FastifyRequest, reply: FastifyReply) {
    const { code } = req.params as { code: string };
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);

    try {
      const result = await jobService.getJobByJobCode(jobCollection, code);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getUniqueCities(req: FastifyRequest, reply: FastifyReply) {
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);

    try {
      const result = await jobService.getUniqueCities(jobCollection);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteJobById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);

    try {
      const result = await jobService.deleteJobById(jobCollection, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async changeJobStatusById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const body = req.body as JobStatusType;
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);

    try {
      const result = await jobService.changeJobStatusById(jobCollection, id, body);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateReviewStatus(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const { id: userId } = req.jwtPayload;
    const body = req.body as jobReviewStatusType;
    const jobCollection = req.server.mongo.db!.collection<JobType>(CollectionName.job);

    try {
      const result = await jobService.updateReviewStatus(jobCollection, id, userId, body);
      reply.send(result);
    } catch (error) {
      handleError(reply, error, req);
    }
  },
};
