import express from "express";

import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { getDailySalesReport } from "../controllers/salesReport/getDailySalesReport";
import { getMonthlySalesReport } from "../controllers/salesReport/getMonthlySalesReport";
import { getYearlySalesReport } from "../controllers/salesReport/getYearlySalesReport";
export const saleReportRouter = express.Router();

saleReportRouter.get("/daily", isAuthenticated, getDailySalesReport);
saleReportRouter.get("/monthly", isAuthenticated, getMonthlySalesReport);
saleReportRouter.get("/yearly", isAuthenticated, getYearlySalesReport);
