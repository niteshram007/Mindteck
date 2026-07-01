import { FastifyReply, FastifyRequest } from "fastify";
import { saveFile } from "./fileHandler";
import { UPLOAD_TEMP_DIR } from "../constants";
import { CollectionNameType } from "../constants/collection";
import { handleError } from "../error/handleError";
import { ENV } from "../config";
import { MultipartFile } from "@fastify/multipart";
import { log } from "console";

export async function saveFileService(
  req: FastifyRequest,
  reply: FastifyReply,
  collection: CollectionNameType,
  allowedTypes: string[] = ["image/jpeg", "image/png"],
) {
  const maxFileSize = collection === "career_application" ? ENV.Resume_File_Size : ENV.File_SIZE;

  let file: MultipartFile | undefined;

  try {
    // 1️⃣ Get the uploaded file
    file = await req.file();
    if (!file) return reply.code(400).send({ message: "No file uploaded" });

    // 2️⃣ Validate MIME type
    if (!allowedTypes.includes(file.mimetype)) {
      file.file.resume(); // drain stream to prevent hanging
      return reply.code(400).send({
        message: "Invalid file type. Only (" + allowedTypes.map((s) => s.split("/")[1]).join(", ") + ") allowed.",
      });
    }

    // 3️⃣ Save file to disk with size enforcement
    const savedFile = await saveFile(file, UPLOAD_TEMP_DIR, collection, maxFileSize);

    return reply.send(savedFile);
  } catch (err: any) {
    // Drain stream if something went wrong
    if (file?.file && !file.file.destroyed) {
      file.file.resume();
    }

    handleError(reply, err, req);
  }
}

export async function reCAPTCHA(token: string) {
  const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${ENV.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  return await recaptchaResponse.json();
}
