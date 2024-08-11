import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ error: "Missing id , Please try again!" });

    const supplier = await prisma.suppliers.findFirst({
      where: { id: Number(id) },
    });
    if (!supplier)
      return res.status(404).json({ error: "supplier not found!" });

    return res.status(200).json(supplier);
  } catch (error) {
    return res.status(500).json(error);
  }
};

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

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const { name, contact_number, address } = req.body;
    const isValid = name && contact_number && address;

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data, Please add all fields." });
    }

    const supplier = await prisma.suppliers.create({
      data: { name, contact_number, address },
    });

    if (!supplier) {
      return res.status(400).json({
        error: "Creating suppliers process failed. Please try again. ",
      });
    }

    return res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, contact_number, address } = req.body;
    const isValid = id && name && contact_number && address;
    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data , Please try again!" });
    }

    const updatedSupplier = await prisma.suppliers.update({
      where: { id: Number(id) },
      data: { name, contact_number, address },
    });
    return res.status(200).json({ supplier: updatedSupplier });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(404).json({ error: "Missing id. Please try again. " });

    const supplier = await prisma.suppliers.findFirst({
      where: { id: Number(id) },
    });
    if (!supplier) {
      return res
        .status(404)
        .json({ error: "supplier not found. Please try again" });
    }

    await prisma.suppliers.delete({ where: { id: Number(id) } });
    return res.status(200).json({
      message: "deleted supplier successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const deleteSuppliers = async (req: Request, res: Response) => {
  try {
    const { ids } = req.params;
    const supplierIds = ids.split(",").map((id) => Number(id));

    if (!ids.length)
      return res.status(400).json({ error: "messing Ids , Please try again" });

    await prisma.suppliers.deleteMany({ where: { id: { in: supplierIds } } });

    return res.status(200).json({
      message: "deleted supplers successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
