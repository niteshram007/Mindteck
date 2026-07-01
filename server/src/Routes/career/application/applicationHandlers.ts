import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionName } from "../../../constants/collection";
import { handleError } from "../../../error/handleError";
import {
  ApplicationCreateType,
  ApplicationQueryType,
  ApplicationStatusType,
  ApplicationType,
} from "./applicationSchemas";
import { applicationService } from "./applicationService";
import { saveFileService } from "../../../utils/service";

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const applicationHandlers = {
  async uploadApplicationFile(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.application, allowedTypes);
  },

  async createApplication(req: FastifyRequest, reply: FastifyReply) {
    const applicationCollection = req.server.mongo.db!.collection<ApplicationType>(CollectionName.application);
    const data = req.body as ApplicationCreateType;
    try {
      const result = await applicationService.createApplication(applicationCollection, data);

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateApplication(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const applicationCollection = req.server.mongo.db!.collection<ApplicationType>(CollectionName.application);

    try {
      const data = req.body as ApplicationType;

      const result = await applicationService.updateApplication(applicationCollection, data, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateStatusApplication(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const applicationCollection = req.server.mongo.db!.collection<ApplicationStatusType>(CollectionName.application);

    try {
      const data = req.body as ApplicationStatusType;

      const result = await applicationService.updateStatusApplication(applicationCollection, data, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getApplications(req: FastifyRequest, reply: FastifyReply) {
    const applicationCollection = req.server.mongo.db!.collection<ApplicationType>(CollectionName.application);
    const { page, pageSize, search } = req.query as { page: string; pageSize: string; search: string | undefined };

    try {
      const currentPage = parseInt(page) || 1;
      const currentPageSize = parseInt(pageSize) || 10;
      const applications = await applicationService.getApplications(
        applicationCollection,
        currentPage,
        currentPageSize,
        search,
      );
      reply.send(applications);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getApplicationsFiltered(req: FastifyRequest, reply: FastifyReply) {
    const applicationCollection = req.server.mongo.db!.collection<ApplicationType>(CollectionName.application);
    const filterOption = req.query as ApplicationQueryType;
    try {
      const applications = await applicationService.getApplicationsFiltered(applicationCollection, filterOption);
      reply.send(applications);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getApplicationsByJobId(req: FastifyRequest, reply: FastifyReply) {
    const applicationCollection = req.server.mongo.db!.collection<ApplicationType>(CollectionName.application);
    const { jobId, page, pageSize } = req.query as { page: string; pageSize: string; jobId: string };

    try {
      const currentPage = parseInt(page) || 1;
      const currentPageSize = parseInt(pageSize) || 10;
      const applications = await applicationService.getApplicationsByJobId(
        applicationCollection,
        jobId,
        currentPage,
        currentPageSize,
      );
      reply.send(applications);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteApplicationById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const applicationCollection = req.server.mongo.db!.collection<ApplicationType>(CollectionName.application);

    try {
      const result = await applicationService.deleteApplicationById(applicationCollection, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
  async deleteBulkApplication(req: FastifyRequest, reply: FastifyReply) {
    const { ids } = req.body as { ids: string[] };
    const applicationCollection = req.server.mongo.db!.collection<ApplicationType>(CollectionName.application);

    try {
      const result = await applicationService.deleteBulkApplication(applicationCollection, ids);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
