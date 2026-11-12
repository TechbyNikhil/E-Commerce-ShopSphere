import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("ShopSphere Backend is Running!");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to ShopSphere API!",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`ShopSphere backend running on port ${PORT}`);
  });
};

startServer();