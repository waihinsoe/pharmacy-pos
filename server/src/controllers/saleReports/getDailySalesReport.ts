import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const getDailySalesReport = async (req: Request, res: Response) => {
  const salesByDay = await prisma.sales.findMany({
    select: {
      sale_date: true,
      total_amount: true,
    },
    orderBy: {
      sale_date: "asc",
    },
  });

  const dailySales = salesByDay.reduce(
    (acc: any, { sale_date, total_amount }) => {
      const dataKey = sale_date.toISOString().split("T")[0];
      if (!acc[dataKey]) {
        acc[dataKey] = 0;
      }
      acc[dataKey] += total_amount;
      return acc;
    },
    {}
  );

  const data = Object.entries(dailySales).map(([date, total_amount]) => ({
    sale_date: date,
    total_amount,
  }));

  return res.send(data);
};
