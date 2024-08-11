import express from "express";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";
import {
  createProduct,
  deleteProduct,
  deleteProducts,
  getProduct,
  getProducts,
  updateProduct,
} from "../../controllers/product/product.controller";

export const productRouter = express.Router();

productRouter.get("/", isAuthenticated, getProducts);
productRouter.get("/:id", isAuthenticated, getProduct);

productRouter.post("/", isAuthenticated, createProduct);

productRouter.put("/:id", isAuthenticated, updateProduct);

productRouter.delete("/:id", isAuthenticated, deleteProduct);
// delete many
productRouter.delete("/deleteMany/:ids", isAuthenticated, deleteProducts);
