import { Collection, ObjectId } from "mongodb";
//
import CustomError from "../../../error";
import { CommitteeType } from "./committeeSchemas";

export const CommitteeService = {
  async createCommittee(
    CommitteeCollection: Collection<CommitteeType>,
    data: CommitteeType,
  ): Promise<{ message: string }> {
    const CommitteeData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await CommitteeCollection.insertOne(CommitteeData);
    return { message: "Created successfully" };
  },

  async updateCommittee(
    CommitteeCollection: Collection<CommitteeType>,
    updatedCommittee: CommitteeType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const result = await CommitteeCollection.updateOne(
      { _id: objectId },
      { $set: { ...updatedCommittee, updatedAt: new Date() } },
    );
    if (!result.matchedCount) {
      throw new CustomError("Not found with id " + id + ", Please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getCommittees(CommitteeCollection: Collection<CommitteeType>) {
    return await CommitteeCollection.find().toArray();
  },

  async getCommitteeGrouped(CommitteeCollection: Collection<CommitteeType>) {
    const groupedCommittee =  await CommitteeCollection
      .aggregate([
        
        {
          $group: {
            _id: "$committeeType",
            members: { $push: "$$ROOT" },
          },
        },
      ])
      .toArray();

      const result = groupedCommittee.reduce((acc, item) => {
        const key = item._id;
        acc[key] = item.members;

        return acc;
      },{});

      return  result;
  },

  async deleteCommitteeById(CommitteeCollection: Collection<CommitteeType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await CommitteeCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new CustomError("Committee not found with id " + id + ", Please try again.");
    }
    return { message: "Deleted successfully" };
  },
};
