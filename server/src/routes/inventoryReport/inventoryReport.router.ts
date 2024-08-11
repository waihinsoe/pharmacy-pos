import express from "express";

import { isAuthenticated } from "../../middleware/auth/isAuthenticated";
import {
  getCategoriesReport,
  getProductsReport,
} from "../../controllers/inventoryReport/inventoryReport.controller";

export const inventoryReportRouter = express.Router();

inventoryReportRouter.get("/categories", isAuthenticated, getCategoriesReport);
inventoryReportRouter.get("/products", isAuthenticated, getProductsReport);
