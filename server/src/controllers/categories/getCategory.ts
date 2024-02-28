import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ error: "Missing id , Please try again!" });

    const category = await prisma.categories.findFirst({
      where: { id: Number(id) },
    });
    if (!category)
      return res.status(404).json({ error: "category not found!" });

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
};
