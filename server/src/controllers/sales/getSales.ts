import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getSales = async (req: Request, res: Response) => {
  const isPaginateFetch = req.query.hasOwnProperty("page");
  if (!isPaginateFetch) {
    try {
      const sales = await prisma.sales.findMany({
        select: {
          id: true,
          total_amount: true,
          payment_method: true,
          sale_date: true,
          Customers: {
            select: {
              name: true,
            },
          },
          Users: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      if (!sales) {
        return res.status(200).json({ message: "Sales not found." });
      }

      const formattedSalesData = sales.map((sale) => ({
        id: sale.id,
        customer_name: sale.Customers?.name, // Assuming there can be sales without a customer
        seller_name: sale.Users.name,
        total_amount: sale.total_amount,
        payment_method: sale.payment_method,
        sale_date: sale.sale_date,
      }));

      return res.status(200).json(formattedSalesData);
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
