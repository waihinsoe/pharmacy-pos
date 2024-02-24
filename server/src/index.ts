import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRouter";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { categoriesRouter } from "./routes/categoriesRouter";
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
app.use("/api/categories", categoriesRouter);

app.listen(3000, () => {
  console.log("server is listening at port 3000");
});
