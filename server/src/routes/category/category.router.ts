import express from "express";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
} from "../../controllers/category/category.controller";

export const categoryRouter = express.Router();

categoryRouter.get("/", isAuthenticated, getCategories);

categoryRouter.post("/", isAuthenticated, createCategory);

categoryRouter.get("/:id", isAuthenticated, getCategory);

categoryRouter.put("/:id", isAuthenticated, updateCategory);

categoryRouter.delete("/:id", isAuthenticated, deleteCategory);

// delete many
categoryRouter.delete("/deleteMany/:ids", isAuthenticated, deleteCategories);
