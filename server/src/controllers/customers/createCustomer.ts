import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, contact_number, email, loyalty_points } = req.body;
    const isValid = name && contact_number && email && loyalty_points;

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data, Please add all fields." });
    }

    const customer = await prisma.customers.create({
      data: { name, contact_number, email, loyalty_points },
    });

    if (!customer) {
      return res.status(400).json({
        error: "Creating customer process failed. Please try again. ",
      });
    }

    return res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};
