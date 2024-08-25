import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { deleteImage, uploadImage } from "../asset/asset.controller";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ error: "Missing id , Please try again!" });

    const product = await prisma.products.findFirst({
      where: { id: Number(id) },
    });

    if (!product) return res.status(404).json({ error: "product not found!" });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

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

export const createProduct = async (req: Request, res: Response) => {
  //@ts-ignore
  const filePath = req.file?.path;
  try {
    const {
      name,
      description,
      price,
      quantity,
      expriy_date,
      category_id,
      supplier_id,
      barcode,
    } = req.body;
    const isValid =
      name &&
      description &&
      quantity &&
      expriy_date &&
      category_id &&
      supplier_id &&
      barcode &&
      filePath;

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data, Please add all fields." });
    }

    const result = await uploadImage(filePath);
    const img_url = result?.secure_url;

    if (!img_url) return res.status(400).json({ error: "image upload fail!" });

    const product = await prisma.products.create({
      data: {
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        expriy_date,
        category_id: Number(category_id),
        supplier_id: Number(supplier_id),
        barcode,
        img_url,
      },
    });

    if (!product) {
      return res.status(400).json({
        error: "Creating products process failed. Please try again. ",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      quantity,
      expriy_date,
      category_id,
      supplier_id,
      barcode,
      img_url,
    } = req.body;

    const isValid =
      id &&
      name &&
      description &&
      barcode &&
      quantity &&
      expriy_date &&
      category_id &&
      supplier_id &&
      img_url;

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Missing some data , Please try again!" });
    }

    const product = await prisma.products.findFirst({
      where: { id: Number(id) },
    });
    console.log(product);
    if (!product) {
      return res
        .status(404)
        .json({ error: "product not found. Please try again" });
    }

    let new_img_url: string | undefined;

    if (req.file) {
      const filePath = req.file?.path;
      await deleteImage(product.img_url);
      const result = await uploadImage(filePath);
      new_img_url = result?.secure_url;

      if (!new_img_url)
        return res.status(400).json({ error: "image upload fail!" });
    }

    const updatedProduct = await prisma.products.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        barcode,
        expriy_date,
        category_id: Number(category_id),
        supplier_id: Number(supplier_id),
        img_url: new_img_url || img_url,
      },
    });
    return res.status(200).json({ category: updatedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id)
      return res.status(404).json({ error: "Missing id. Please try again. " });

    const product = await prisma.products.findFirst({
      where: { id: Number(id) },
    });
    if (!product) {
      return res
        .status(404)
        .json({ error: "product not found. Please try again" });
    }

    await prisma.products.delete({ where: { id: Number(id) } });

    console.log(await deleteImage(product.img_url));

    return res.status(200).json({
      message: "deleted product successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { ids } = req.params;
    const productIds = ids.split(",").map((id) => Number(id));

    if (!ids.length)
      return res.status(400).json({ error: "messing Ids , Please try again" });

    await prisma.products.deleteMany({ where: { id: { in: productIds } } });

    return res.status(200).json({
      message: "deleted products successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
