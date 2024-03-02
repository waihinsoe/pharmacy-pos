import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const deleteCustomers = async (req: Request, res: Response) => {
  try {
    const { ids } = req.params;
    const customerIds = ids.split(",").map((id) => Number(id));

    if (!ids.length)
      return res.status(400).json({ error: "messing Ids , Please try again" });

    await prisma.customers.deleteMany({ where: { id: { in: customerIds } } });

    return res.status(200).json({
      message: "deleted customers successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
