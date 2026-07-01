import { FastifyReply, FastifyRequest } from "fastify";
import { JwtPayload } from "../utils/types";

const tokenBlacklist: Map<string, number> = new Map();
const oneDayInMs = 24 * 60 * 60 * 1000;
export const BYPASS_API_KEY = "my-secret-bypass-token";

const cleanupBlacklist = () => {
  const now = Date.now();

  for (const [token, timestamp] of tokenBlacklist.entries()) {
    if (now - timestamp > oneDayInMs) {
      tokenBlacklist.delete(token);
    }
  }
};

setInterval(cleanupBlacklist, oneDayInMs);

export const addToBlacklist = (token: string) => {
  const timestamp = Date.now();
  tokenBlacklist.set(token, timestamp);
};

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if(process.env.NODE_ENV !== "production"){
      const apiKey = request.headers["x-api-key"];
  
      if (apiKey === BYPASS_API_KEY) {
        return; // Bypass token is valid, continue request
      }
    }

    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    if (tokenBlacklist.has(token)) {
      return reply.status(401).send({ message: "Token is invalidated. Please log in again." });
    }

    const decoded = await request.jwtVerify<JwtPayload>();
    request.jwtPayload = decoded;
  } catch (error) {
    reply.log.error(error);
    reply.status(401).send({ message: "Unauthorized" });
  }
};
