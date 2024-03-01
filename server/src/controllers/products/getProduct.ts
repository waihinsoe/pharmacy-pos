import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ error: "Missing id , Please try again!" });

    const product = await prisma.products.findFirst({
      where: { id: Number(id) },
    });

    if (!product) return res.status(404).json({ error: "product not found!" });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
