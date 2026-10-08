import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import couponRoutes from "./routes/coupons.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 5000;

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://192.168.1.5:5173",
      "http://192.168.1.5:5174"
    ],
    credentials: true
  })
);

// JSON
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "VYORA API is running",
    version: "1.0.0"
  });
});

// API ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/coupons",
  couponRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found"
  });
});

// ERROR HANDLER
app.use(
  (error, req, res, next) => {
    console.error(error);

    res.status(
      error.status || 500
    ).json({
      message:
        error.message ||
        "Internal server error"
    });
  }
);

// DATABASE
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing from .env"
      );
    }

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected successfully"
    );

    app.listen(
      PORT,
      () => {
        console.log(
          `VYORA API running on http://localhost:${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();