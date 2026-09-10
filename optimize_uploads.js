const sharp = require("/root/cms_application/deploy/client/node_modules/sharp");
const fs = require("fs");
const path = require("path");

const rootDir = "/root/cms_application/deploy/upload";

function getAllFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".png", ".jpg", ".jpeg"].includes(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

async function optimizeFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size < 100 * 1024) return; // Skip if already under 100 KB

    const ext = path.extname(filePath).toLowerCase();
    const meta = await sharp(filePath).metadata();
    const width = meta.width && meta.width > 1920 ? 1920 : meta.width;

    let pipeline = sharp(filePath);
    if (width && meta.width > 1920) {
      pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
    }

    let buffer;
    if (ext === ".png") {
      buffer = await pipeline
        .png({ quality: 75, compressionLevel: 9, palette: true })
        .toBuffer();
    } else {
      buffer = await pipeline
        .jpeg({ quality: 78, mozjpeg: true })
        .toBuffer();
    }

    if (buffer && buffer.length < stats.size) {
      const saved = Math.round((stats.size - buffer.length) / 1024);
      fs.writeFileSync(filePath, buffer);
      console.log(`Optimized ${filePath}: ${Math.round(stats.size/1024)} KB -> ${Math.round(buffer.length/1024)} KB (Saved ${saved} KB)`);
    } else {
      console.log(`Skipping ${filePath}: no size reduction`);
    }
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err.message);
  }
}

async function main() {
  const files = getAllFiles(rootDir);
  console.log(`Found ${files.length} images across ${rootDir}`);
  for (const file of files) {
    await optimizeFile(file);
  }
  console.log("Optimization complete!");
}

main();
