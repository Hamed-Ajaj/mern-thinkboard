import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

connectDB();
app.use(express.json());
app.use("/api/notes", notesRoutes);
app.listen(process.env.PORT || 5001, () => {
  console.log("Server running on PORT:", process.env.PORT);
});

//
