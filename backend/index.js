import express from "express";
import cors from "cors";
import authRoutes from "./authRoutes.js";

const app = express();
app.use(cors());
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
