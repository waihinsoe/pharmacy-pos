import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const isValid = name && description;

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data, Please add all fields." });
    }

    const category = await prisma.categories.create({
      data: { name, description },
    });

    if (!category) {
      return res.status(400).json({
        error: "Creating categories process failed. Please try again. ",
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};
