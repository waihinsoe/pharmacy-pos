import express from "express";
import {
  getSaleDetail,
  getSales,
  createNewSale,
} from "../../controllers/sale/sale.controller";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";

export const saleRouter = express.Router();

saleRouter.get("/:saleId/detail", isAuthenticated, getSaleDetail);
saleRouter.get("/", isAuthenticated, getSales);

saleRouter.post("/", isAuthenticated, createNewSale);
