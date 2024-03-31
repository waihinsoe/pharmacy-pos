import express from "express";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { createNewSale } from "../controllers/sales/createNewSale";
import { getSales } from "../controllers/sales/getSales";
import { getSaleDetail } from "../controllers/sales/getSaleDetail";

export const saleRouter = express.Router();

saleRouter.get("/:saleId/detail", isAuthenticated, getSaleDetail);
saleRouter.get("/", isAuthenticated, getSales);

saleRouter.post("/", isAuthenticated, createNewSale);
