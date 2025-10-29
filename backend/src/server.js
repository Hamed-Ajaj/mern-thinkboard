import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { auth } from "./lib/auth.js";
import isLoggedIn from "./middleware/isLoggedIn.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    }),
  );
}
app.all("/api/auth/*", toNodeHandler(auth)); // For ExpressJS v4
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", isLoggedIn, notesRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});

//
