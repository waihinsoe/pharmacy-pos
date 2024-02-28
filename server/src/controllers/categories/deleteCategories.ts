import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const deleteCategories = async (req: Request, res: Response) => {
  try {
    const { ids } = req.params;
    const categoryIds = ids.split(",").map((id) => Number(id));

    if (!ids.length)
      return res.status(400).json({ error: "messing Ids , Please try again" });

    await prisma.categories.deleteMany({ where: { id: { in: categoryIds } } });

    return res.status(200).json({
      message: "deleted category successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
