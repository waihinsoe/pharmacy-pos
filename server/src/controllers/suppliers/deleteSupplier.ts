import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(404).json({ error: "Missing id. Please try again. " });

    const supplier = await prisma.suppliers.findFirst({
      where: { id: Number(id) },
    });
    if (!supplier) {
      return res
        .status(404)
        .json({ error: "supplier not found. Please try again" });
    }

    await prisma.suppliers.delete({ where: { id: Number(id) } });
    return res.status(200).json({
      message: "deleted supplier successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
