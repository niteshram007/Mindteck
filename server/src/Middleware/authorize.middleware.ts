import { FastifyReply, FastifyRequest } from "fastify";
import { RoleEnumType } from "../Routes/user/userSchemas";
import { BYPASS_API_KEY } from "./authenticate.middleware";

export const authorize = (passedRole: RoleEnumType[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      if(process.env.NODE_ENV !== "production"){
        const apiKey = request.headers["x-api-key"];
    
        if (apiKey === BYPASS_API_KEY) {
          return;
        }
      }
      
      const jwtRole = request.jwtPayload.role;

      if (!passedRole.includes(jwtRole)) {
        return reply.status(403).send({ message: "Forbidden" });
      }
    } catch (error) {
      reply.log.error(error);
      reply.status(401).send({ message: "Unauthorized" });
    }
  };
};
