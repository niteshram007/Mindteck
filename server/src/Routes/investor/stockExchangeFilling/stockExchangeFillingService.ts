import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../../error";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { StockExchangeFilingType, StockExchangeFilingUpdateType } from "./stockExchangeFillingSchemas";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

export const stockExchangeFilingService = {
  async createStockExchangeFiling(
    stockExchangeFilingCollection: Collection<StockExchangeFilingType>,
    data: StockExchangeFilingType,
  ): Promise<{ message: string }> {
    for (const section of data.stockExchangeFilings) {
      if (section.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, section.file.filePath), join(UPLOAD_DIR, section.file.filePath));
      }
    }

    const stockExchangeFilingData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isExist = await stockExchangeFilingCollection.findOne({ financialYear: data.financialYear });

    if (!isExist) {
      await stockExchangeFilingCollection.insertOne(stockExchangeFilingData);
      return { message: "Created successfully" };
    } else {
      await stockExchangeFilingCollection.updateOne(
        {
          financialYear: data.financialYear,
        },
        {
          $push: {
            stockExchangeFilings: {
              $each: stockExchangeFilingData.stockExchangeFilings,
              $position: 0,
            },
          },
        },
      );
      return { message: "Created successfully" };
    }
  },

  async updateStockExchangeFiling(
    stockExchangeFilingCollection: Collection<StockExchangeFilingType>,
    updatedStockExchangeFiling: StockExchangeFilingUpdateType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const oldStockExchangeFiling = await stockExchangeFilingCollection.findOne({ _id: objectId });

    if (!oldStockExchangeFiling) {
      throw new CustomError("Not found, please try again");
    }

    const existingNotice = oldStockExchangeFiling.stockExchangeFilings.find(
      (n) => n.id === updatedStockExchangeFiling.id,
    );

    // UPDATED Files
    if (existingNotice && existingNotice.file.filePath !== updatedStockExchangeFiling.file.filePath) {
      if (existingNotice.file.filePath) {
        await deleteFile(join(UPLOAD_DIR, existingNotice.file.filePath));
      }

      if (updatedStockExchangeFiling.file.filePath) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedStockExchangeFiling.file.filePath),
          join(UPLOAD_DIR, updatedStockExchangeFiling.file.filePath),
        );
      }
    }

    const result = await stockExchangeFilingCollection.updateOne(
      {
        _id: objectId, // Match the document by _id
        "stockExchangeFilings.id": updatedStockExchangeFiling.id,
      },
      {
        $set: {
          "stockExchangeFilings.$": updatedStockExchangeFiling,
          updatedAt: new Date(),
        },
      },
    );
    if (!result.matchedCount) {
      throw new CustomError("Not found with id " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getStockExchangeFilings(stockExchangeFilingCollection: Collection<StockExchangeFilingType>) {
    const result = await stockExchangeFilingCollection.find().toArray();

    return result.sort((a, b) => {
      const yearA = parseInt(a.financialYear.split("-")[0], 10);
      const yearB = parseInt(b.financialYear.split("-")[0], 10);

      return yearB - yearA;
    });
  },

  async getBySession(
    stockExchangeFilingCollection: Collection<StockExchangeFilingType>,
    financialYear: string | undefined,
  ) {
    const filter = financialYear ? { financialYear } : {};
    return await stockExchangeFilingCollection.find(filter).toArray();
  },

  async deleteStockExchangeFilingById(stockExchangeFilingCollection: Collection<StockExchangeFilingType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await stockExchangeFilingCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Stock Exchange Filing not found with id " + id + ", please try again");
    }
    for (const stockExchangeFiling of result.stockExchangeFilings) {
      if (stockExchangeFiling?.file) {
        await deleteFile(join(UPLOAD_DIR, stockExchangeFiling.file.filePath));
      }
    }

    return { message: "Deleted successfully" };
  },

  async deleteItemStockExchangeFilingById(
    stockExchangeFilingCollection: Collection<StockExchangeFilingType>,
    objectId: string,
    id: string,
  ) {
    const result = await stockExchangeFilingCollection.findOneAndUpdate(
      { _id: new ObjectId(objectId) },
      { $pull: { stockExchangeFilings: { id } } },
      {returnDocument:"before"}
    );

    
    const stockExchangeFiling = result?.stockExchangeFilings.find((s) => s.id === id);
    if (!stockExchangeFiling) {
      throw new CustomError("No document was updated check if the IDs are correct and try again");
    }
    if (stockExchangeFiling.file) {
      await deleteFile(join(UPLOAD_DIR, stockExchangeFiling.file.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
