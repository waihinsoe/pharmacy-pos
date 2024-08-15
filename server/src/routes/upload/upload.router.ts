import express from "express";
import { uploadImage } from "../../controllers/upload/upload.controller";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config";
import { upload } from "../../middleware/multer-config";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const uploadRouter = express.Router();

uploadRouter.post(
  "/image",
  isAuthenticated,
  upload.single("file"),
  uploadImage
);

export default uploadRouter;
