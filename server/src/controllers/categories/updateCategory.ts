import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const isValid = id && name && description;
    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data , Please try again!" });
    }

    const updatedCategory = await prisma.categories.update({
      where: { id: Number(id) },
      data: { name, description },
    });
    return res.status(200).json({ category: updatedCategory });
  } catch (error) {
    res.status(500).json(error);
  }
};
