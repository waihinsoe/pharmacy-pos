import express from "express";
import { getAllCategories } from "../controllers/categories/getAllCategories";
import { createCategory } from "../controllers/categories/createCategory";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { deleteCategory } from "../controllers/categories/deleteCategory";
import { deleteCategories } from "../controllers/categories/deleteCategories";

export const categoryRouter = express.Router();

categoryRouter.get("/", isAuthenticated, getAllCategories);

categoryRouter.post("/", isAuthenticated, createCategory);

categoryRouter.delete("/:id", isAuthenticated, deleteCategory);
// delete many
categoryRouter.delete("/deleteMany/:ids", isAuthenticated, deleteCategories);
