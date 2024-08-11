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

export const getCustomers = async (req: Request, res: Response) => {
  const isPaginateFetch = req.query.hasOwnProperty("page");
  if (!isPaginateFetch) {
    try {
      const customers = await prisma.customers.findMany({
        orderBy: {
          created_at: "desc",
        },
      });

      if (!customers) {
        return res.status(200).json({ message: "customers not found." });
      }

      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  try {
    const { page = 1, limit = 10, searchTerm = "" } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const filteredCustomers = await prisma.customers.findMany({
      where: {
        OR: [{ name: { contains: searchTerm as string, mode: "insensitive" } }],
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const total = await prisma.categories.count({
      where: {
        OR: [{ name: { contains: searchTerm as string, mode: "insensitive" } }],
      },
    });

    if (!filteredCustomers) {
      return res.status(200).json({ message: "Customers not found." });
    }

    res.json({
      data: filteredCustomers,
      total: total,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

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
