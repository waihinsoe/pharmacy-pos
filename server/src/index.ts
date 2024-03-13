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
import { saleRouter } from "./routes/saleRouter";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // This should match the client's origin
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser(config.cookieSecret));

app.get("/search", (req: Request, res: Response) => {
  console.log(req.query);
  console.log("hello");
  res.send({ message: "hello" });
});

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/products", productRouter);
app.use("/api/customers", customerRouter);
app.use("/api/sales", saleRouter);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("qrCodeDetected", (data) => {
    console.log("Received QR Code:", data.qrValue);

    // Process the QR code here
    // For example, you might want to validate the QR code or look up associated data

    // Send a response back to the client
    io.sockets.emit("serverResponse", {
      message: "QR Code processed successfully",
      qrCode: data.qrValue,
    });

    // Alternatively, you could broadcast to all connected clients (if applicable)
    // io.emit('broadcastEvent', { data: 'some data to all clients' });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("server is listening at port 3000");
});
