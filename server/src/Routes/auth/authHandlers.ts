import { FastifyReply, FastifyRequest } from "fastify";
//
import { UserType } from "../user/userSchemas";
import { PasswordHandler } from "../../utils/passwordHandler";
import CustomError from "../../error";
import { reCAPTCHA } from "../../utils/service";
import { JwtPayload } from "../../utils/types";
import { authenticator } from "otplib";

authenticator.options = { window: 1 };

const passwordHandler = new PasswordHandler();

export const authHandlers = {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const userCollection = request.server.mongo.db!.collection<UserType>("user");

    const { username, password, token, totp } = request.body as {
      username: string;
      password: string;
      token: string;
      totp?: string;
    };

    // const data = await reCAPTCHA(token);
    // if (!data.success || data.score < 0.8) {
    //   throw new CustomError("reCAPTCHA verification, failed, please try again.");
    // }

    if (!username || !password) {
      return reply.status(400).send({ message: "Username and password are required" });
    }

    try {
      const user = await userCollection.findOne({ username });
      if (!user) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const isMatch = await passwordHandler.comparePassword(password, user.password);
      if (!isMatch) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const requiresTotp = user.role === "Admin" || user.role === "SuperAdmin";
      if (requiresTotp) {
        if (!user.totpSecret) {
          return reply.status(403).send({ message: "TOTP not configured for this account" });
        }

        const normalizedTotp = String(totp || "").replace(/\s+/g, "");
        if (!normalizedTotp) {
          return reply.status(400).send({ message: "Authenticator code is required" });
        }

        const totpValid = authenticator.check(normalizedTotp, user.totpSecret);
        if (!totpValid) {
          return reply.status(401).send({ message: "Invalid authenticator code" });
        }
      }

      const token = request.server.jwt.sign({ id: user._id.toString(), role: user.role });

      return reply.send({
        user: {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ message: "Error during login" });
    }
  },

  async verify(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { token } = request.body as { token: string };
      const decoded = (await request.server.jwt.verify(token)) as JwtPayload;
      if (decoded.exp < Date.now() / 1000) {
        return reply.status(401).send({ message: "Token has expired" });
      } else if (!decoded) {
        return reply.status(401).send({ message: "Token is not valid" });
      } else {
        return reply.status(200).send({
          message: "Token is valid",
        });
      }
    } catch (error) {
      console.log(error);
      reply.status(500).send({ message: "Error during verify" });
    }
  },
};
