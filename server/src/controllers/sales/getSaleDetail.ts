import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getSaleDetail = async (req: Request, res: Response) => {
  const { saleId } = req.params;
  const isPaginateFetch = req.query.hasOwnProperty("page");
  if (!isPaginateFetch) {
    try {
      const saleDetails = await prisma.sale_details.findMany({
        select: {
          id: true,
          sale_id: true,
          quantity: true,
          price: true,
          Products: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
        where: {
          sale_id: Number(saleId),
        },
      });

      if (!saleDetails) {
        return res.status(200).json({ message: "saleDetails not found." });
      }

      const formattedSaleDetailData = saleDetails.map((saleDetail) => ({
        id: saleDetail.id,
        sale_id: saleDetail.sale_id,
        product_name: saleDetail.Products.name,
        quantity: saleDetail.quantity,
        price: saleDetail.price,
      }));

      return res.status(200).json(formattedSaleDetailData);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  try {
    const { page = 1, limit = 10, searchTerm = "" } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const filteredSales = await prisma.sales.findMany({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const total = await prisma.sales.count();

    if (!filteredSales) {
      return res.status(200).json({ message: "Sales not found." });
    }

    res.json({
      data: filteredSales,
      total: total,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
