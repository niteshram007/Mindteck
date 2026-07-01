import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../error/handleError";
import { stockService } from "./stockPriceService";


export const stockHandlers = {
  async getPrice(req: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await stockService.getPrice();
      reply.send(users);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};