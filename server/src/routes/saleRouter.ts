import express from "express";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { createNewSale } from "../controllers/sales/createNewSale";
import { getSales } from "../controllers/sales/getSales";
import { getSaleDetail } from "../controllers/sales/getSaleDetail";

export const saleRouter = express.Router();

saleRouter.get("/:saleId/detail", isAuthenticated, getSaleDetail);
saleRouter.get("/", isAuthenticated, getSales);

saleRouter.post("/", isAuthenticated, createNewSale);

// saleRouter.get("/:id", isAuthenticated, getSupplier);

// saleRouter.post("/", isAuthenticated, createSupplier);

// saleRouter.put("/:id", isAuthenticated, updateSupplier);

// saleRouter.delete("/:id", isAuthenticated, deleteSupplier);
// // delete many
// saleRouter.delete("/deleteMany/:ids", isAuthenticated, deleteSuppliers);
