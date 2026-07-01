import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ObjectId } from "mongodb";
import { z } from "zod";
//
import { validate } from "../../Middleware/validation.middleware";
import { PasswordHandler } from "../../utils/passwordHandler";
import { UserType } from "../user/userSchemas";
import { addToBlacklist } from "../../Middleware/authenticate.middleware";
import { authorize } from "../../Middleware/authorize.middleware";

const passwordHandler = new PasswordHandler();

export function authRoutes(app: FastifyInstance) {
  app.post("/logout", { schema: { tags: ["Auth"] } }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        return reply.status(400).send({ message: "Token is required for logout." });
      }

      addToBlacklist(token);

      reply.status(200).send({ message: "Logged out successfully." });
    } catch{
      reply.status(500).send({ message: "Error during logout." });
    }
  });

  // app.post(
  //   "/reset-password",
  //   { preHandler: validate(z.object({ emailId: z.string().email().max(255) })) },
  //   async (request:FastifyRequest, reply:FastifyReply) => {
  //     const { emailId } = request.body as { emailId: string };

  //     try {
  //       const [user] = await db.select().from(usersTable).where(eq(usersTable.emailId, emailId));
  //       if (!user) {
  //         return reply.status(403).send({ message: "Invalid emailId, Please enter registered emailId" });
  //       }
  //       const newPassword = generateRandomPassword();
  //       const hashedPassword = await hashPassword(newPassword);

  //       await sendPasswordResetEmail(emailId, newPassword);
  //       await db.update(usersTable).set({ password: hashedPassword }).where(eq(usersTable.emailId, emailId));

  //       reply.status(200).send({
  //         message: "A new password has been sent to " + emailId + ". Please check your inbox after some time.",
  //       });
  //     } catch (error) {
  //       reply.status(500).send({ message: "Error occurred  during reset password" });
  //     }
  //   },
  // );

  app.post(
    "/change-password",
    {
      schema: { tags: ["Auth"] },
      preHandler: validate(
        z.object({
          oldPassword: z.string().min(1, "Old Password is required"),
          newPassword: z.string().min(6, "Password must be at least 6 characters").min(1, "New Password is required"),
        }),
      ),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.jwtPayload;
        const { newPassword, oldPassword } = request.body as { oldPassword: string; newPassword: string };
        const userCollection = app.mongo.client.db("cms").collection<UserType>("user");

        if (oldPassword === newPassword) {
          return reply
            .status(401)
            .send({
              message: "New password and old password should not be same, please try again with different password",
            });
        }

        const user = await userCollection.findOne({ _id: new ObjectId(id) });

        if (!user) {
          return reply.status(401).send({ message: "Invalid credentials" });
        }

        const isMatch = await passwordHandler.comparePassword(oldPassword, user.password);
        if (!isMatch) {
          return reply.status(401).send({ message: "old password is not correct, Please try again" });
        }

        const newHashedPassword = await passwordHandler.hashPassword(newPassword);

        await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: { password: newHashedPassword } });

        reply.status(200).send({
          message: "A new password has been successfully set.",
        });
      } catch (error) {
        console.log(error, "change password");
        reply.status(500).send({ message: "Error during changing password" });
      }
    },
  );
}
