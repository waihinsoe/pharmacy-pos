import express from "express";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { createNewSale } from "../controllers/sales/createNewSale";

export const saleRouter = express.Router();

saleRouter.post("/", isAuthenticated, createNewSale);
// saleRouter.get("/:id", isAuthenticated, getSupplier);

// saleRouter.post("/", isAuthenticated, createSupplier);

// saleRouter.put("/:id", isAuthenticated, updateSupplier);

// saleRouter.delete("/:id", isAuthenticated, deleteSupplier);
// // delete many
// saleRouter.delete("/deleteMany/:ids", isAuthenticated, deleteSuppliers);
