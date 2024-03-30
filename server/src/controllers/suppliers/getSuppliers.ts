import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getSuppliers = async (req: Request, res: Response) => {
  const isPaginateFetch = req.query.hasOwnProperty("page");
  if (!isPaginateFetch) {
    try {
      const suppliers = await prisma.suppliers.findMany();

      if (!suppliers) {
        return res.status(200).json({ message: "suppliers not found." });
      }

      return res.status(200).json(suppliers);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  try {
    const { page = 1, limit = 10, searchTerm = "" } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const filteredSuppliers = await prisma.suppliers.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm as string, mode: "insensitive" } },
          {
            contact_number: {
              contains: searchTerm as string,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: searchTerm as string,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const total = await prisma.suppliers.count({
      where: {
        OR: [
          { name: { contains: searchTerm as string, mode: "insensitive" } },
          {
            contact_number: {
              contains: searchTerm as string,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: searchTerm as string,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (!filteredSuppliers) {
      return res.status(200).json({ message: "suppliers not found." });
    }

    res.json({
      data: filteredSuppliers,
      total: total,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
