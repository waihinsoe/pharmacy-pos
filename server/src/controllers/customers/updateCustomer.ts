import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, contact_number, email, loyalty_points } = req.body;
    const isValid = id && name && contact_number && email && loyalty_points;
    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data , Please try again!" });
    }

    const updatedCustomer = await prisma.customers.update({
      where: { id: Number(id) },
      data: { name, contact_number, email, loyalty_points },
    });
    return res.status(200).json({ category: updatedCustomer });
  } catch (error) {
    res.status(500).json(error);
  }
};
