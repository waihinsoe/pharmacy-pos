import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      quantity,
      expriy_date,
      category_id,
      supplier_id,
    } = req.body;

    const isValid =
      id &&
      name &&
      description &&
      quantity &&
      expriy_date &&
      category_id &&
      supplier_id;

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data , Please try again!" });
    }

    const updatedProduct = await prisma.products.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price,
        quantity,
        expriy_date,
        category_id,
        supplier_id,
      },
    });
    return res.status(200).json({ category: updatedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};
