import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../error/handleError";

const execFileAsync = promisify(execFile);
const FRONTEND_NEXT_CACHE_DIR = resolve(process.cwd(), "../client/.next/cache");
const PM2_BIN = "/usr/bin/pm2";

export const cacheHandlers = {
  async clearCache(req: FastifyRequest, reply: FastifyReply) {
    try {
      await rm(FRONTEND_NEXT_CACHE_DIR, { recursive: true, force: true });
      await mkdir(FRONTEND_NEXT_CACHE_DIR, { recursive: true });

      await execFileAsync(PM2_BIN, ["restart", "client"], {
        timeout: 120000,
      });

      reply.send({
        message: "Cache cleared and frontend restarted successfully.",
        cachePath: FRONTEND_NEXT_CACHE_DIR,
      });
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
