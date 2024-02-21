import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { authRouter } from "./routes/authRouter";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "hello" });
});

app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("server is listening at port 3000");
});
