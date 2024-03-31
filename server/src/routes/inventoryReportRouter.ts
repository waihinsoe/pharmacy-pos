import express from "express";
import { getCategoriesReport } from "../controllers/inventoryReport/getCategoriesReport";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { getProductsReport } from "../controllers/inventoryReport/getProductsReport";

export const inventoryReportRouter = express.Router();

inventoryReportRouter.get("/categories", isAuthenticated, getCategoriesReport);
inventoryReportRouter.get("/products", isAuthenticated, getProductsReport);
