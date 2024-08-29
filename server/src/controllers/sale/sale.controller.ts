import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { calculateTotalAmount } from "../../utils";
import { SaledProduct } from "../../types";
import { sendStockOutEmail } from "../../services/emailService";
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

export const createNewSale = async (req: Request, res: Response) => {
  try {
    const { customer_id, user_id, saled_products, payment_method } = req.body;
    const isValid = user_id && saled_products.length > 0 && payment_method;
    if (!isValid) return res.status(400).json({ error: "bad request!" });

    const total_amount = calculateTotalAmount(saled_products);

    const result = await prisma.$transaction(async (prisma) => {
      // customer_id is optional
      const newSale = await prisma.sales.create({
        data: { customer_id, user_id, total_amount, payment_method },
      });

      const sale_details_data = saled_products.map((product: SaledProduct) => {
        return {
          sale_id: newSale.id,
          product_id: product.id,
          quantity: product.count,
          price: product.count * product.price,
        };
      });

      await prisma.sale_details.createMany({ data: sale_details_data });

      //Reduce product quantities
      for (const product of saled_products) {
        const currentProduct = await prisma.products.findUnique({
          where: { id: product.id },
        });

        if (!currentProduct || currentProduct.quantity < product.count) {
          throw new Error("Product stock is insufficient");
        }

        const updatedProduct = await prisma.products.update({
          where: { id: product.id },
          data: { quantity: currentProduct.quantity - product.count },
        });

        if (updatedProduct.quantity <= 0) {
          sendStockOutEmail(updatedProduct);
        }
      }
      return newSale;
    });

    return res
      .status(200)
      .json({ message: "Sale created successfully", sale_id: result?.id });
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};
