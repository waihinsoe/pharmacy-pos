import express, { Request, Response } from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "hello" });
});

app.listen(3000, () => {
  console.log("server is listening at port 3000");
});
