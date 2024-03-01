import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ error: "Missing id , Please try again!" });

    const supplier = await prisma.suppliers.findFirst({
      where: { id: Number(id) },
    });
    if (!supplier)
      return res.status(404).json({ error: "supplier not found!" });

    return res.status(200).json(supplier);
  } catch (error) {
    return res.status(500).json(error);
  }
};
