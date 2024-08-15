import express from "express";
import {
  getDailySalesReport,
  getMonthlySalesReport,
  getYearlySalesReport,
} from "../../controllers/saleReport/saleReport.controller";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";

const saleReportRouter = express.Router();

saleReportRouter.get("/daily", isAuthenticated, getDailySalesReport);
saleReportRouter.get("/monthly", isAuthenticated, getMonthlySalesReport);
saleReportRouter.get("/yearly", isAuthenticated, getYearlySalesReport);

export default saleReportRouter;
