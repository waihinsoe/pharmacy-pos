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
    const salesByYear = await prisma.sales.findMany({
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

    const yearlySales = salesByYear.reduce(
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

    const data = Object.entries(yearlySales).map(([year, total_amount]) => ({
      year,
      total_amount,
    }));

    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
};
