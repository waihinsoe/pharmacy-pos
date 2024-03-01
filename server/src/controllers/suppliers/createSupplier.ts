import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const { name, contact_number, address } = req.body;
    const isValid = name && contact_number && address;

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data, Please add all fields." });
    }

    const supplier = await prisma.suppliers.create({
      data: { name, contact_number, address },
    });

    if (!supplier) {
      return res.status(400).json({
        error: "Creating suppliers process failed. Please try again. ",
      });
    }

    return res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};
