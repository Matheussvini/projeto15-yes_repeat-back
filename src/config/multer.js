import multer from "multer";
import multerS3 from "multer-s3";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import aws from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const StorageTypes = {
  local: multer.diskStorage({
    destination: function (_req, file, cb) {
      cb(null, path.resolve(__dirname, "../", "../", "tmp", "uploads"));
    },
    filename: function (_req, file, cb) {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err);
        }
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err);
        }
        const filename = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, filename);
      });
    },
  }),
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const multerConfig = {
  dest: path.resolve(__dirname, "../", "../", "tmp", "uploads"),
  storage: StorageTypes[process.env.STORAGE_TYPE],
  // limits: {
  //   fileSize: 2 * 1024 * 1024
  // },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
      "image/jpg",
      "image/svg",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
};

export default multerConfig;
