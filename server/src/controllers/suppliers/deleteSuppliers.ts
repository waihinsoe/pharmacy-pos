import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const deleteSuppliers = async (req: Request, res: Response) => {
  try {
    const { ids } = req.params;
    const supplierIds = ids.split(",").map((id) => Number(id));

    if (!ids.length)
      return res.status(400).json({ error: "messing Ids , Please try again" });

    await prisma.suppliers.deleteMany({ where: { id: { in: supplierIds } } });

    return res.status(200).json({
      message: "deleted supplers successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
