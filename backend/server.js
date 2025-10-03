import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(
  cors({
    origin:
      ENV_VARS.NODE_ENV === "production" ? false : "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  console.log("Production mode: Setting up static file serving");
  console.log("Frontend dist path:", path.join(__dirname, "../frontend/dist"));

  // Serve static files from the React app build
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch all handler: send back React's index.html file for any non-API routes
  app.get("*", (req, res) => {
    console.log("Handling request for:", req.path);

    // Don't serve React app for API routes
    if (req.path.startsWith("/api/")) {
      return res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
    }

    const indexPath = path.resolve(__dirname, "../frontend/dist/index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });
}

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
