import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getCustomers = async (req: Request, res: Response) => {
  const isPaginateFetch = req.query.hasOwnProperty("page");
  console.log(isPaginateFetch);
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
