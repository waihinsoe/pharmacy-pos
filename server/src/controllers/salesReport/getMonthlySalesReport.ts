import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import dayjs from "dayjs";
export const getMonthlySalesReport = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    // Start of the start month
    const start = dayjs(startDate as string)
      .startOf("month")
      .toDate();

    // End of the end month
    const end = dayjs(endDate as string)
      .endOf("month")
      .toDate();

    const salesByMonth = await prisma.sales.findMany({
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

    const monthlySales = salesByMonth.reduce(
      (acc: any, { sale_date, total_amount }) => {
        const yearMonth = sale_date.toISOString().substring(0, 7); // Format: YYYY-MM
        if (!acc[yearMonth]) {
          acc[yearMonth] = 0;
        }
        acc[yearMonth] += total_amount;
        return acc;
      },
      {}
    );

    const data = Object.entries(monthlySales).map(
      ([yearMonth, total_amount]) => ({
        month: yearMonth,
        total_amount,
      })
    );

    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
};
