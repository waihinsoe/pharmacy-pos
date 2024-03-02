import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRouter";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { categoryRouter } from "./routes/categoryRouter";
import { supplierRouter } from "./routes/supplierRouter";
import { productRouter } from "./routes/productRouter";
import { customerRouter } from "./routes/customerRouter";
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(cookieParser(config.cookieSecret));

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "hello" });
});

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/products", productRouter);
app.use("/api/customers", customerRouter);

app.listen(3000, () => {
  console.log("server is listening at port 3000");
});
