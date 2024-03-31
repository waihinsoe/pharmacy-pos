import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import dayjs from "dayjs";
export const getDailySalesReport = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  const adjustedEndDate = dayjs(endDate as string)
    .endOf("day")
    .toDate();

  try {
    const salesByDay = await prisma.sales.findMany({
      where: {
        sale_date: {
          gte: startDate ? new Date(startDate as string) : undefined,
          lte: adjustedEndDate,
        },
      },
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
  } catch (error) {
    return res.send(error);
  }
};
