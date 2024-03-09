import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { calculateTotalAmount, calculateTotalItems } from "../../utils";
import { SaledProduct } from "../../types";

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

        await prisma.products.update({
          where: { id: product.id },
          data: { quantity: currentProduct.quantity - product.count },
        });

        return newSale;
      }
    });

    return res
      .status(200)
      .json({ message: "Sale created successfully", sale_id: result?.id });
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};
