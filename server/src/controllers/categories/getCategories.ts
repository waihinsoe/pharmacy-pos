import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getCategories = async (req: Request, res: Response) => {
  const isPaginateFetch = req.query.hasOwnProperty("page");
  if (!isPaginateFetch) {
    try {
      const categories = await prisma.categories.findMany();

      if (!categories) {
        return res.status(200).json({ message: "Categories not found." });
      }

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  try {
    const { page = 1, limit = 10, searchTerm = "" } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const filteredCategories = await prisma.categories.findMany({
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

    const total = await prisma.categories.count({
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

    if (!filteredCategories) {
      return res.status(200).json({ message: "Categories not found." });
    }

    res.json({
      data: filteredCategories,
      total: total,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
