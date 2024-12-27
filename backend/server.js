import express from "express";
import dotenv from "dotenv";

import courseRoutes from "./routes/course.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));
app.use("/api/course", courseRoutes);


app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
