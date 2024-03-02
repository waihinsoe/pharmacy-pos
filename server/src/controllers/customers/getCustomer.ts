import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ error: "Missing id , Please try again!" });

    const customer = await prisma.customers.findFirst({
      where: { id: Number(id) },
    });
    if (!customer)
      return res.status(404).json({ error: "customer not found!" });

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json(error);
  }
};
