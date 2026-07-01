import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../../error";
import {
  BuyBackDailyReportType,
  BuyBackDailyReportUpdateType,
  BuyBackGeneralUpdateType,
  BuyBackGeneralUpdateUpdateType,
  BuyBackType,
} from "./buyBackSchemas";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

export const buyBackService = {
  async createDailyReportsBuyBack(
    buyBackCollection: Collection<BuyBackType>,
    buyBackData: BuyBackDailyReportType,
  ): Promise<{ message: string }> {
    const monthKey = buyBackData.month;

    const isExist = await buyBackCollection.findOne({ year: buyBackData.year });

    const isDuplicate =
      isExist?.dailyReports[buyBackData.month] &&
      Object.values(isExist.dailyReports[buyBackData.month]).some((ss) =>
        buyBackData.dates.some((d) => d.date === ss.date),
      );

    if (isDuplicate) {
      throw new CustomError("Duplicate Date, please select different date");
    }

    for (const date of buyBackData.dates) {
      if (date.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, date.file.filePath), join(UPLOAD_DIR, date.file.filePath));
      }
    }
    if (isExist) {
      await buyBackCollection.updateOne(
        { year: buyBackData.year },
        {
          $push: {
            [`dailyReports.${monthKey}`]: {
              $each: buyBackData.dates,
            },
          },
        },
      );
    } else {
      await buyBackCollection.insertOne({
        dailyReports: { [monthKey]: buyBackData.dates },
        year: buyBackData.year,
        generalUpdated: [],
      });
    }

    return { message: "Created successfully" };
  },

  async createGeneralUpdateBuyBack(
    buyBackCollection: Collection<BuyBackType>,
    buyBackData: BuyBackGeneralUpdateType,
  ): Promise<{ message: string }> {
    const isExist = await buyBackCollection.findOne({ year: buyBackData.year });

    const isDuplicate =
      isExist?.dailyReports &&
      Object.values(isExist.generalUpdated).some((ss) => buyBackData.generalUpdated.some((d) => d.title === ss.title));

    if (isDuplicate) {
      throw new CustomError("Duplicate title, please enter different text");
    }

    if (isExist) {
      await buyBackCollection.updateOne(
        { year: buyBackData.year },
        {
          $push: {
            generalUpdated: {
              $each: buyBackData.generalUpdated,
            },
          },
        },
      );
    } else {
      await buyBackCollection.insertOne({
        dailyReports: {},
        year: buyBackData.year,
        generalUpdated: buyBackData.generalUpdated,
      });
    }

    return { message: "Created successfully" };
  },

  async updateDailyReportsBuyBack(
    buyBackCollection: Collection<BuyBackType>,
    buyBackUpdateData: BuyBackDailyReportUpdateType,
  ): Promise<{ message: string }> {
    const isExist = await buyBackCollection.findOne({ year: buyBackUpdateData.year });
    if (!isExist) {
      throw new CustomError("Not found, please try with different year");
    }

    const objToUpdate =
      isExist?.dailyReports &&
      isExist?.dailyReports[buyBackUpdateData.month].find((d) => d.date === buyBackUpdateData.date);

    if (buyBackUpdateData.file !== objToUpdate?.file) {
      if (objToUpdate) {
        await deleteFile(join(UPLOAD_DIR, objToUpdate.file.filePath));
      }
      if (buyBackUpdateData.file) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, buyBackUpdateData.file.filePath),
          join(UPLOAD_DIR, buyBackUpdateData.file.filePath),
        );
      }
    }
    const monthKey = `dailyReports.${buyBackUpdateData.month}`;
    const result = await buyBackCollection.updateOne(
      {
        year: buyBackUpdateData.year,
        [`${monthKey}.date`]: buyBackUpdateData.date, // Match the specific date inside the array
      },
      {
        $set: {
          [`${monthKey}.$.file`]: {
            filePath: buyBackUpdateData.file.filePath,
            mimetype: buyBackUpdateData.file.mimetype,
          },
        },
      },
    );
    if (result.matchedCount === 0) {
      throw new CustomError("Failed to update, please try again");
    }

    return { message: "Updated successfully" };
  },

  async updateGeneralUpdateBuyBack(
    buyBackCollection: Collection<BuyBackType>,
    buyBackUpdateData: BuyBackGeneralUpdateUpdateType,
  ): Promise<{ message: string }> {
    const { year, ...updateData } = buyBackUpdateData;
    const isExist = await buyBackCollection.findOne({ year });

    if (!isExist) {
      throw new CustomError("Not found, please try with different year");
    }

    const objToUpdate = isExist?.generalUpdated && isExist.generalUpdated.find((d) => d.id === updateData.id);

    if (updateData.file !== objToUpdate?.file) {
      if (objToUpdate) {
        await deleteFile(join(UPLOAD_DIR, objToUpdate.file.filePath));
      }
      if (updateData.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, updateData.file.filePath), join(UPLOAD_DIR, updateData.file.filePath));
      }
    }
    const result = await buyBackCollection.updateOne(
      {
        year,
        "generalUpdated.id": updateData.id,
      },
      {
        $set: {
          "generalUpdated.$": updateData,
        },
      },
    );
    if (result.matchedCount === 0) {
      throw new CustomError("Failed to update, please try again");
    }

    return { message: "Updated successfully" };
  },

  async getBuyBacks(buyBackCollection: Collection<BuyBackType>) {
    return await buyBackCollection.find().toArray();
  },

  async getBuyBacksByYear(buyBackCollection: Collection<BuyBackType>, year: number | undefined) {
    const filter = year ? { year } : {};
    return await buyBackCollection.find(filter).toArray();
  },

  async deleteBuyBackById(buyBackCollection: Collection<BuyBackType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await buyBackCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Buy back not found with id " + id + ", please try again.");
    }
    for (const update of result.generalUpdated) {
      if (update?.file) {
        await deleteFile(join(UPLOAD_DIR, update.file.filePath));
      }
    }

    for (const reports of Object.values(result.dailyReports)) {
      for (const report of reports) {
        if (report.file) {
          await deleteFile(join(UPLOAD_DIR, report.file.filePath));
        }
      }
    }

    return { message: "Deleted successfully" };
  },

  async deleteDailyUpdatedBuyBackByDate(
    buyBackCollection: Collection<BuyBackType>,
    objectId: string,
    month: string,
    date: string,
  ) {
    const monthKey = `dailyReports.${month}`;

    const result = await buyBackCollection.findOneAndUpdate(
      { _id: new ObjectId(objectId) },
      { $pull: { [monthKey]: { date } } },
      { returnDocument: "before" }
    );

    const section = result?.dailyReports[month].find((s) => s.date === date);
    
    if (!section) {
      throw new CustomError("No document was updated. Check if the IDs are correct and try again");
    }

    if (section?.file) {
      await deleteFile(join(UPLOAD_DIR, section.file.filePath));
    }
    return { message: "Deleted successfully" };
  },

  async deleteGeneralUpdatedBuyBackById(buyBackCollection: Collection<BuyBackType>, objectId: string, id: string) {
    const result = await buyBackCollection.findOneAndUpdate(
      { _id: new ObjectId(objectId) },
      { $pull: { generalUpdated: { id } } },
    );

    if (!result) {
      throw new CustomError("No document was updated. Check if the IDs are correct and try again");
    }

    const section = result.generalUpdated.find((s) => s.id === id);
    if (section?.file) {
      await deleteFile(join(UPLOAD_DIR, section.file.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
