import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(404).json({ error: "Missing id. Please try again. " });

    const customer = await prisma.customers.findFirst({
      where: { id: Number(id) },
    });
    if (!customer) {
      return res
        .status(404)
        .json({ error: "customer not found. Please try again" });
    }

    await prisma.customers.delete({ where: { id: Number(id) } });
    return res.status(200).json({
      message: "deleted customer successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
