import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
// app.use(rateLimiter);
app.use("/api/notes", notesRoutes);
app.listen(process.env.PORT || 5001, () => {
  console.log("Server running on PORT:", process.env.PORT);
});

//
