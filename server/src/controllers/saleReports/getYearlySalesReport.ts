import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import dayjs from "dayjs";

export const getYearlySalesReport = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  try {
    // Start of the start month
    const start = dayjs(startDate as string)
      .startOf("year")
      .toDate();

    // End of the end month
    const end = dayjs(endDate as string)
      .endOf("year")
      .toDate();
    const salesByDay = await prisma.sales.findMany({
      where: {
        sale_date: {
          gte: start,
          lte: end,
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
        const year = sale_date.toISOString().substring(0, 4); // Format: YYYY-MM
        if (!acc[year]) {
          acc[year] = 0;
        }
        acc[year] += total_amount;
        return acc;
      },
      {}
    );

    const data = Object.entries(dailySales).map(([year, total_amount]) => ({
      year,
      total_amount,
    }));

    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
};
