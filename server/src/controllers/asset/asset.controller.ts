import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config";

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) return;
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "pharmacy_pos",
    });
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
};

export const deleteImage = async (img_url: string) => {
  const url = new URL(img_url);
  const pathSegments = url.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  const id = lastSegment.split(".")[0];
  console.log(id);
  const result = await cloudinary.uploader.destroy(`pharmacy_pos/${id}`);
  return result;
};
