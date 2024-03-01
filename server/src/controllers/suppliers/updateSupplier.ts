import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, contact_number, address } = req.body;
    const isValid = id && name && contact_number && address;
    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data , Please try again!" });
    }

    const updatedSupplier = await prisma.suppliers.update({
      where: { id: Number(id) },
      data: { name, contact_number, address },
    });
    return res.status(200).json({ supplier: updatedSupplier });
  } catch (error) {
    res.status(500).json(error);
  }
};
