import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ error: "Missing id , Please try again!" });

    const category = await prisma.categories.findFirst({
      where: { id: Number(id) },
    });
    if (!category)
      return res.status(404).json({ error: "category not found!" });

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
};

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

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const isValid = name && description;

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data, Please add all fields." });
    }

    const category = await prisma.categories.create({
      data: { name, description },
    });

    if (!category) {
      return res.status(400).json({
        error: "Creating categories process failed. Please try again. ",
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const isValid = id && name && description;
    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data , Please try again!" });
    }

    const updatedCategory = await prisma.categories.update({
      where: { id: Number(id) },
      data: { name, description },
    });
    return res.status(200).json({ category: updatedCategory });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(404).json({ error: "Missing id. Please try again. " });

    const cateogry = await prisma.categories.findFirst({
      where: { id: Number(id) },
    });
    if (!cateogry) {
      return res
        .status(404)
        .json({ error: "Category not found. Please try again" });
    }

    await prisma.categories.delete({ where: { id: Number(id) } });
    return res.status(200).json({
      message: "deleted category successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const deleteCategories = async (req: Request, res: Response) => {
  try {
    const { ids } = req.params;
    const categoryIds = ids.split(",").map((id) => Number(id));

    if (!ids.length)
      return res.status(400).json({ error: "messing Ids , Please try again" });

    await prisma.categories.deleteMany({ where: { id: { in: categoryIds } } });

    return res.status(200).json({
      message: "deleted category successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
