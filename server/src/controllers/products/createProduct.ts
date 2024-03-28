import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      expriy_date,
      category_id,
      supplier_id,
      barcode,
      img_url,
    } = req.body;
    const isValid =
      name &&
      description &&
      quantity &&
      expriy_date &&
      category_id &&
      supplier_id &&
      barcode &&
      img_url;

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data, Please add all fields." });
    }

    const product = await prisma.products.create({
      data: {
        name,
        description,
        price,
        quantity,
        expriy_date,
        category_id,
        supplier_id,
        barcode,
        img_url,
      },
    });

    if (!product) {
      return res.status(400).json({
        error: "Creating products process failed. Please try again. ",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};
