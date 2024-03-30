import express from "express";
import { getDailySalesReport } from "../controllers/saleReports/getDailySalesReport";
import { getMonthlySalesReport } from "../controllers/saleReports/getMonthlySalesReport";
import { getYearlySalesReport } from "../controllers/saleReports/getYearlySalesReport";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
export const saleReportRouter = express.Router();

saleReportRouter.get("/daily", isAuthenticated, getDailySalesReport);
saleReportRouter.get("/monthly", isAuthenticated, getMonthlySalesReport);
saleReportRouter.get("/yearly", isAuthenticated, getYearlySalesReport);
