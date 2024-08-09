import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id)
      return res.status(404).json({ error: "Missing id. Please try again. " });

    const product = await prisma.products.findFirst({
      where: { id: Number(id) },
    });
    if (!product) {
      return res
        .status(404)
        .json({ error: "product not found. Please try again" });
    }

    await prisma.products.delete({ where: { id: Number(id) } });
    return res.status(200).json({
      message: "deleted product successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
