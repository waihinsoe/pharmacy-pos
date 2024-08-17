import express from "express";
import { uploadImage } from "../../controllers/asset/asset.controller";
import { upload } from "../../middleware/multer-config";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";

const assetRouter = express.Router();

assetRouter.post(
  "/upload/image",
  isAuthenticated,
  upload.single("file"),
  uploadImage
);

export default assetRouter;
