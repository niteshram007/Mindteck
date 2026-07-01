import { JwtPayload } from "./src/utils/types";

declare module "fastify" {
  interface FastifyRequest {
    jwtPayload: JwtPayload;
  }
}
