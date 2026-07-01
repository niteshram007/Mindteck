import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { noticeHandlers } from "./noticeHandlers";
import { JsonNoticeSchema, JsonNoticeUpdateSchema, NoticeSchema, NoticeUpdateSchema } from "./noticeSchemas";
import { validate } from "../../../Middleware/validation.middleware";
import { uploadSchema } from "../../../utils/schema";
import { authorize } from "../../../Middleware/authorize.middleware";

export function noticeRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Notice"]), preHandler:authorize(["SuperAdmin"]) }, noticeHandlers.uploadImage);
  
  app.post(
    "/create",
    {
      schema: JsonNoticeSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(NoticeSchema)],
    },

    noticeHandlers.createNotice,
  );

  app.put(
    "/update/:id",
    {
      schema: JsonNoticeUpdateSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(NoticeUpdateSchema)],
    },

    noticeHandlers.updateNotice,
  );

  app.get(
    "/getall",
    {
      schema: {
        tags: ["Notice"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    noticeHandlers.getNotices,
  );

  app.get(
    "/getBySession/:session",
    {
      schema: {
        tags: ["Notice"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    noticeHandlers.getBySession,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Notice"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    noticeHandlers.deleteNoticeById,
  );

  app.delete(
    "/:objectId/:id",
    {
      schema: {
        tags: ["Notice"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    noticeHandlers.deleteItemNoticeById,
  );
}
