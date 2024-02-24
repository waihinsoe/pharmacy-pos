import express from "express";
import { getAllCategories } from "../controllers/categories/getAllCategories";
import { createCategories } from "../controllers/categories/createCategories";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { deleteCategories } from "../controllers/categories/deleteCategories";

export const categoriesRouter = express.Router();

categoriesRouter.get("/", isAuthenticated, getAllCategories);

categoriesRouter.post("/", isAuthenticated, createCategories);

categoriesRouter.delete("/:id", isAuthenticated, deleteCategories);
