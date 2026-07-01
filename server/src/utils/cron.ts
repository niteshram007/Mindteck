import cron from "node-cron";
import fs from "fs";
import { logger } from "./logger";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../constants";
import { ENV } from "../config";
import { dirname, join } from "node:path";

const tempFolderPath = join(__dirname, "../../", UPLOAD_TEMP_DIR);
const uploadFolderPath = join(__dirname, "../../", UPLOAD_DIR);

function copyMissingFilesRecursive(sourceDir: string, targetDir: string) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  entries.forEach((entry) => {
    const sourcePath = join(sourceDir, entry.name);
    const targetPath = join(targetDir, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }

      copyMissingFilesRecursive(sourcePath, targetPath);
      return;
    }

    if (!entry.isFile()) {
      return;
    }

    if (!fs.existsSync(dirname(targetPath))) {
      fs.mkdirSync(dirname(targetPath), { recursive: true });
    }

    if (!fs.existsSync(targetPath)) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

function syncTempToUpload() {
  try {
    if (!fs.existsSync(tempFolderPath)) {
      return;
    }

    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath, { recursive: true });
    }

    copyMissingFilesRecursive(tempFolderPath, uploadFolderPath);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error(`Error syncing temp files to upload: ${message}`);
  }
}

function deleteFilesInTemp() {
  fs.readdir(tempFolderPath, (err, files) => {
    if (err) {
      console.error(`Error reading temp folder: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      const filePath = join(tempFolderPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error reading file stats for ${file}: ${err.message}`);
          return;
        }

        if (stats.isFile()) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${file}: ${err.message}`);
            } else {
              console.log(`Deleted file: ${file}`);
            }
          });
        }
      });
    });
  });
}

function setupCronJobs() {
  logger.info("Setting up cron jobs...");

  // Keep uploaded files resilient: sync missing files from temp to upload.
  syncTempToUpload();

  // Run every 10 minutes.
  cron.schedule("*/10 * * * *", () => {
    logger.info("Running scheduled task: syncing temp files to upload folder");
    syncTempToUpload();
  });

  // Existing cleanup task (typically Sunday midnight based on ENV.CRON).
  cron.schedule(ENV.CRON, () => {
    logger.warn("Running scheduled task: Deleting files in temp folder");
    deleteFilesInTemp();
  });

  logger.success("Cron jobs setup complete.");
}

export { setupCronJobs };
