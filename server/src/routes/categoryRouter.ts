import express from "express";
import { getCategories } from "../controllers/categories/getCategories";
import { createCategory } from "../controllers/categories/createCategory";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { deleteCategory } from "../controllers/categories/deleteCategory";
import { deleteCategories } from "../controllers/categories/deleteCategories";
import { updateCategory } from "../controllers/categories/updateCategory";
import { getCategory } from "../controllers/categories/getCategory";

export const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", isAuthenticated, getCategory);

categoryRouter.post("/", isAuthenticated, createCategory);

categoryRouter.put("/:id", isAuthenticated, updateCategory);

categoryRouter.delete("/:id", isAuthenticated, deleteCategory);
// delete many
categoryRouter.delete("/deleteMany/:ids", isAuthenticated, deleteCategories);
