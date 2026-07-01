import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../../error";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { NoticeType, NoticeUpdateType } from "./noticeSchemas";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

export const noticeService = {
  async createNotice(noticeCollection: Collection<NoticeType>, data: NoticeType): Promise<{ message: string }> {
    for (const section of data.notices) {
      if (section.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, section.file.filePath), join(UPLOAD_DIR, section.file.filePath));
      }
    }

    const noticeData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isExist = await noticeCollection.findOne({
      $and: [{ financialYear: data.financialYear }, { heading: noticeData.heading }],
    });

    if (!isExist) {
      await noticeCollection.insertOne(noticeData);
      return { message: "Created successfully" };
    } else {
      await noticeCollection.updateOne(
        {
          $and: [{ financialYear: data.financialYear }, { heading: noticeData.heading }],
        },
        {
          $push: {
            notices: {
              $each: noticeData.notices,
              $position: 0,
            },
          },
        },
      );
      return { message: "Created successfully" };
    }
  },

  async updateNotice(
    noticeCollection: Collection<NoticeType>,
    updatedNotice: NoticeUpdateType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const oldNotice = await noticeCollection.findOne({ _id: objectId });

    if (!oldNotice) {
      throw new CustomError("No notice found, please try again");
    }

    const existingNotice = oldNotice.notices.find((n) => n.id === updatedNotice.id);

    // UPDATED Files
    if (existingNotice && existingNotice.file.filePath !== updatedNotice.file.filePath) {
      if (existingNotice.file.filePath) {
        await deleteFile(join(UPLOAD_DIR, existingNotice.file.filePath));
      }

      if (updatedNotice.file.filePath) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedNotice.file.filePath),
          join(UPLOAD_DIR, updatedNotice.file.filePath),
        );
      }
    }

    const result = await noticeCollection.updateOne(
      {
        _id: objectId, // Match the document by _id
        "notices.id": updatedNotice.id,
      },
      {
        $set: {
          "notices.$": updatedNotice,
          updatedAt: new Date(),
        },
      },
    );
    if (!result.matchedCount) {
      throw new CustomError("Not found with id " + id + "please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getNotices(noticeCollection: Collection<NoticeType>) {
    const result = await noticeCollection.find().toArray();

    return result.sort((a, b) => {
      const yearA = parseInt(a.financialYear.split("-")[0], 10);
      const yearB = parseInt(b.financialYear.split("-")[0], 10);

      return yearB - yearA;
    });
  },

  async getBySession(noticeCollection: Collection<NoticeType>, financialYear: string | undefined) {
    const filter = financialYear ? { financialYear } : {};
    const result = await noticeCollection.find(filter).toArray();
    if (!result) {
      throw new CustomError("No result found, please try again.");
    }

    return result;
  },

  async deleteNoticeById(noticeCollection: Collection<NoticeType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await noticeCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Notice not found with id " + id + ", please try again");
    }

    for (const notice of result.notices) {
      if (notice.file) {
        await deleteFile(join(UPLOAD_DIR, notice.file.filePath));
      }
    }

    return { message: "Deleted successfully" };
  },

  async deleteItemNoticeById(noticeCollection: Collection<NoticeType>, objectId: string, noticeId: string) {
    const result = await noticeCollection.findOneAndUpdate(
      { _id: new ObjectId(objectId) },
      { $pull: { notices: { id: noticeId } } },
    );

    
    const notice = result?.notices.find((n) => n.id === noticeId);
    if (!notice) {
      throw new CustomError("No document was updated, check if the IDs are correct and try gain");
    }
    if (notice.file) {
      await deleteFile(join(UPLOAD_DIR, notice.file.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
