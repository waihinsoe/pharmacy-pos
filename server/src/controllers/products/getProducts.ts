import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getProducts = async (req: Request, res: Response) => {
  const isPaginateFetch = req.query.hasOwnProperty("page");
  if (!isPaginateFetch) {
    try {
      const products = await prisma.products.findMany();

      if (!products) {
        return res.status(200).json({ message: "Products not found." });
      }

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  try {
    const { page = 1, limit = 10, searchTerm = "" } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const filteredProducts = await prisma.products.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm as string, mode: "insensitive" } },
          {
            description: {
              contains: searchTerm as string,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const total = await prisma.products.count({
      where: {
        OR: [
          { name: { contains: searchTerm as string, mode: "insensitive" } },
          {
            description: {
              contains: searchTerm as string,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (!filteredProducts) {
      return res.status(200).json({ message: "Products not found." });
    }

    res.json({
      data: filteredProducts,
      total: total,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
