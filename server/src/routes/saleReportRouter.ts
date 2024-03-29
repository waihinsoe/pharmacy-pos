import express from "express";
import { getDailySalesReport } from "../controllers/saleReports/getDailySalesReport";
export const saleReportRouter = express.Router();

saleReportRouter.get("/daily", getDailySalesReport);
