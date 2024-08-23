import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { config } from "./config";
import categoryRouter from "./routes/category/category.router";
import supplierRouter from "./routes/supplier/supplier.router";
import productRouter from "./routes/product/product.router";
import customerRouter from "./routes/customer/customer.router";
import saleRouter from "./routes/sale/sale.router";
import http from "http";
import { Server } from "socket.io";
import saleReportRouter from "./routes/saleReport/saleReport.router";
import inventoryReportRouter from "./routes/inventoryReport/inventoryReport.router";
import authRouter from "./routes/auth/auth.router";
import assetRouter from "./routes/asset/asset.router";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["*", "http://localhost:5173"], // This should match the client's origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
app.use(express.json());

app.use(
  cors({
    origin: ["*", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser(config.cookieSecret));

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/products", productRouter);
app.use("/api/customers", customerRouter);
app.use("/api/sales", saleRouter);
app.use("/api/sales/reports", saleReportRouter);
app.use("/api/inventory/reports", inventoryReportRouter);
app.use("/api/asset", assetRouter);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("barcodeDetected", (data) => {
    console.log("Received QR Code:", data.barcode);

    // Process the QR code here
    // For example, you might want to validate the QR code or look up associated data

    // Send a response back to the client
    io.sockets.emit("barcodeForProduct", {
      message: "barcode processed successfully",
      barcode: data.barcode,
    });

    io.sockets.emit("scannedProduct", {
      message: "found scannedProduct successfully",
      barcode: data.barcode,
    });

    // Alternatively, you could broadcast to all connected clients (if applicable)
    // io.emit('broadcastEvent', { data: 'some data to all clients' });
  });

  socket.on("add_product", (data) => {
    console.log(data);
    io.sockets.emit("add_product", { message: true });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
