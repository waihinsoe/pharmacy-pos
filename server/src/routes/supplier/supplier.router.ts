import express from "express";
import {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  deleteSuppliers,
} from "../../controllers/supplier/supplier.controller";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";

export const supplierRouter = express.Router();

supplierRouter.get("/", isAuthenticated, getSuppliers);
supplierRouter.get("/:id", isAuthenticated, getSupplier);

supplierRouter.post("/", isAuthenticated, createSupplier);

supplierRouter.put("/:id", isAuthenticated, updateSupplier);

supplierRouter.delete("/:id", isAuthenticated, deleteSupplier);
// delete many
supplierRouter.delete("/deleteMany/:ids", isAuthenticated, deleteSuppliers);
