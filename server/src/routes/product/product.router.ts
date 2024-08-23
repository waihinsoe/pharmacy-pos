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
import { upload } from "../../middleware/multer-config";

const productRouter = express.Router();

productRouter.get("/", isAuthenticated, getProducts);
productRouter.get("/:id", isAuthenticated, getProduct);

productRouter.post("/", isAuthenticated, upload.single("file"), createProduct);

productRouter.put("/:id", isAuthenticated, updateProduct);

productRouter.delete("/:id", isAuthenticated, deleteProduct);
// delete many
productRouter.delete("/deleteMany/:ids", isAuthenticated, deleteProducts);

export default productRouter;
