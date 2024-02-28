import express from "express";
import { getAllCategories } from "../controllers/categories/getAllCategories";
import { createCategory } from "../controllers/categories/createCategory";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { deleteCategory } from "../controllers/categories/deleteCategory";
import { deleteCategories } from "../controllers/categories/deleteCategories";
import { getCategory } from "../controllers/categories/getCategory";
import { updateCategory } from "../controllers/categories/updateCategory";

export const categoryRouter = express.Router();

categoryRouter.get("/:id", isAuthenticated, getCategory);
categoryRouter.get("/", isAuthenticated, getAllCategories);

categoryRouter.post("/", isAuthenticated, createCategory);

categoryRouter.put("/:id", isAuthenticated, updateCategory);

categoryRouter.delete("/:id", isAuthenticated, deleteCategory);
// delete many
categoryRouter.delete("/deleteMany/:ids", isAuthenticated, deleteCategories);
