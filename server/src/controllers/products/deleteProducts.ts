import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { ids } = req.params;
    const productIds = ids.split(",").map((id) => Number(id));

    if (!ids.length)
      return res.status(400).json({ error: "messing Ids , Please try again" });

    await prisma.products.deleteMany({ where: { id: { in: productIds } } });

    return res.status(200).json({
      message: "deleted products successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
