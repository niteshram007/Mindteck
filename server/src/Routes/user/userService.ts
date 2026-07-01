import { Collection, ObjectId } from "mongodb";
//
import { UserType } from "./userSchemas";
import CustomError from "../../error";
import { PasswordHandler } from "../../utils/passwordHandler";

const passwordHandler = new PasswordHandler();
export const userService = {
  async createUser(userCollection: Collection<UserType>, data: UserType): Promise<{ message: string }> {
    // Hash the password before saving
    const hashedPassword = await passwordHandler.hashPassword(data.password);

    const userData = {
      ...data,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await userCollection.insertOne(userData);
    return { message: "Created successfully" };
  },

  async updateUser(userCollection: Collection<UserType>, userId: string, data: UserType): Promise<{ message: string }> {
    // Prepare update data
    const updateData = {
      ...data,
      updatedAt: new Date(),
    };

    if (data.password) {
      updateData.password = await passwordHandler.hashPassword(data.password);
    }

    const objectId = new ObjectId(userId);

    // Update user data in the database
    await userCollection.updateOne({ _id: objectId }, { $set: updateData });

    return { message: "Updated successfully" };
  },

  async getUsers(userCollection: Collection<UserType>) {
    return await userCollection
      .find()
      .map((user) => ({ ...user, password: undefined }))
      .toArray();
  },

  async getUserById(userCollection: Collection<UserType>, id: string) {
    const objectId = new ObjectId(id);

    return await userCollection.findOne({ _id: objectId }).then((user) => ({ ...user, password: undefined }));
  },

  async deleteUser(user: Collection<UserType>, userId: string): Promise<{ message: string }> {
    const objectId = new ObjectId(userId);

    const result = await user.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      throw new CustomError("User not found with ID " + objectId + ", please try again.");
    }

    return { message: "Deleted successfully" };
  },
};
