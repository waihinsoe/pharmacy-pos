import express from "express";
import { isAuthenticated } from "../middlewares/auth/isAuthenticated";
import { getCustomers } from "../controllers/customers/getCustomers";
import { getCustomer } from "../controllers/customers/getCustomer";
import { createCustomer } from "../controllers/customers/createCustomer";
import { updateCustomer } from "../controllers/customers/updateCustomer";
import { deleteCustomer } from "../controllers/customers/deleteCustomer";
import { deleteCustomers } from "../controllers/customers/deleteCustomers";

export const customerRouter = express.Router();

customerRouter.get("/", isAuthenticated, getCustomers);
customerRouter.get("/:id", isAuthenticated, getCustomer);

customerRouter.post("/", isAuthenticated, createCustomer);

customerRouter.put("/:id", isAuthenticated, updateCustomer);

customerRouter.delete("/:id", isAuthenticated, deleteCustomer);
// delete many
customerRouter.delete("/deleteMany/:ids", isAuthenticated, deleteCustomers);
