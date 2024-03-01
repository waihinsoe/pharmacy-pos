import express from "express";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { getSuppliers } from "../controllers/suppliers/getSuppliers";
import { getSupplier } from "../controllers/suppliers/getSupplier";
import { createSupplier } from "../controllers/suppliers/createSupplier";
import { updateSupplier } from "../controllers/suppliers/updateSupplier";
import { deleteSupplier } from "../controllers/suppliers/deleteSupplier";
import { deleteSuppliers } from "../controllers/suppliers/deleteSuppliers";

export const supplierRouter = express.Router();

supplierRouter.get("/", isAuthenticated, getSuppliers);
supplierRouter.get("/:id", isAuthenticated, getSupplier);

supplierRouter.post("/", isAuthenticated, createSupplier);

supplierRouter.put("/:id", isAuthenticated, updateSupplier);

supplierRouter.delete("/:id", isAuthenticated, deleteSupplier);
// delete many
supplierRouter.delete("/deleteMany/:ids", isAuthenticated, deleteSuppliers);
