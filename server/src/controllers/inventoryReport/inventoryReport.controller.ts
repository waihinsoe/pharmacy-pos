import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getCategoriesReport = async (req: Request, res: Response) => {
  const salesWithCategories = await prisma.categories.findMany({
    select: {
      name: true,
      Products: {
        select: {
          name: true,
          Sale_details: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  const result = salesWithCategories.reduce((acc: any, { name, Products }) => {
    const product_total = Products.reduce(
      (productSum: number, { Sale_details }) => {
        const sale_total = Sale_details.reduce((saleSum, { price }) => {
          return saleSum + price;
        }, 0);
        return productSum + sale_total;
      },
      0
    );
    const editName = name.split(" ").join("_");
    if (!acc[editName]) {
      acc[editName] = 0;
    }

    acc[editName] += product_total;
    return acc;
  }, {});

  console.log(result);

  const data = Object.entries(result).map(([name, total_amount]) => ({
    name,
    total_amount,
  }));

  // console.log(data);

  return res.send(data);
};

export const getProductsReport = async (req: Request, res: Response) => {
  const salesWithProducts = await prisma.products.findMany({
    select: {
      name: true,
      Sale_details: {
        select: {
          price: true,
        },
      },
    },
  });

  const result = salesWithProducts.reduce(
    (acc: any, { name, Sale_details }) => {
      const saledProductTotalPrice = Sale_details.reduce(
        (saleSum, { price }) => {
          return saleSum + price;
        },
        0
      );
      const editName = name.split(" ").join("_");
      if (!acc[editName]) {
        acc[editName] = 0;
      }
      acc[editName] += saledProductTotalPrice;
      return acc;
    },
    {}
  );

  const data = Object.entries(result).map(([name, total_amount]) => {
    return {
      name,
      total_amount,
    };
  });
  console.log(data);
  return res.send(data);
};
