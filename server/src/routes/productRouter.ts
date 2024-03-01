import express from "express";
import { getCategories } from "../controllers/categories/getCategories";
import { createCategory } from "../controllers/categories/createCategory";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { deleteCategory } from "../controllers/categories/deleteCategory";
import { deleteCategories } from "../controllers/categories/deleteCategories";
import { updateCategory } from "../controllers/categories/updateCategory";
import { getCategory } from "../controllers/categories/getCategory";
import { getProducts } from "../controllers/products/getProducts";
import { getProduct } from "../controllers/products/getProduct";
import { createProduct } from "../controllers/products/createProduct";
import { updateProduct } from "../controllers/products/updateProduct";
import { deleteProduct } from "../controllers/products/deleteProduct";
import { deleteProducts } from "../controllers/products/deleteProducts";

export const productRouter = express.Router();

productRouter.get("/", isAuthenticated, getProducts);
productRouter.get("/:id", isAuthenticated, getProduct);

productRouter.post("/", isAuthenticated, createProduct);

productRouter.put("/:id", isAuthenticated, updateProduct);

productRouter.delete("/:id", isAuthenticated, deleteProduct);
// delete many
productRouter.delete("/deleteMany/:ids", isAuthenticated, deleteProducts);
