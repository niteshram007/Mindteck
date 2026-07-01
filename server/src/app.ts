import fastify from "fastify";
import { ajvFilePlugin } from "@fastify/multipart";
//
import { ENV } from "./config";
import { logger } from "./utils/logger";
import { initializeCollections } from "./db/initializeCollections";
import { registerPlugins } from "./plugin";
import { setupCronJobs } from "./utils/cron";

const app = fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino/file",
      options: { destination: ENV.ERROR_LOG },
    },
  },
});

(async () => {
  try {
    // Register plugins
    await registerPlugins(app);

    // Initialize cron jobs
    setupCronJobs();

    // Initialize collections and indexes
    const db = app.mongo?.db;
    if (!db) {
      throw new Error("Failed to connect DB");
    }

    await initializeCollections(db);

    // Start the server
    app.listen({ port: ENV.PORT, host: ENV.HOST }, (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      logger.success(`🚀 Server running at. ${address}`);
    });
  } catch (err) {
    console.error("Error during app initialization:", err);
    process.exit(1);
  }
})();
