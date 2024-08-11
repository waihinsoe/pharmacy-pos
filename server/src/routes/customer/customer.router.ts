import express from "express";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";
import {
  createCustomer,
  deleteCustomer,
  deleteCustomers,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../../controllers/customer/customer.controller";

export const customerRouter = express.Router();

customerRouter.get("/", isAuthenticated, getCustomers);

customerRouter.post("/", isAuthenticated, createCustomer);

customerRouter.get("/:id", isAuthenticated, getCustomer);

customerRouter.put("/:id", isAuthenticated, updateCustomer);

customerRouter.delete("/:id", isAuthenticated, deleteCustomer);
// delete many
customerRouter.delete("/deleteMany/:ids", isAuthenticated, deleteCustomers);
