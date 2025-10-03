import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import fs from "fs";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

// Get port from environment or default to 10000
const PORT = process.env.PORT || 10000;
const __dirname = path.resolve();

console.log("Starting server with PORT:", PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

// Basic CORS for Railway
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Health check endpoint - should be first
app.get("/health", (req, res) => {
  console.log("Health check requested");
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    port: PORT,
    env: process.env.NODE_ENV 
  });
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  console.log("Production mode: Setting up static file serving");
  const frontendPath = path.join(__dirname, "../frontend/dist");
  console.log("Frontend dist path:", frontendPath);
  
  // Check if frontend dist exists
  if (fs.existsSync(frontendPath)) {
    console.log("✅ Frontend dist directory exists");
    const indexPath = path.join(frontendPath, "index.html");
    if (fs.existsSync(indexPath)) {
      console.log("✅ index.html exists");
    } else {
      console.log("❌ index.html not found");
    }
  } else {
    console.log("❌ Frontend dist directory not found");
  }
  
  app.use(express.static(frontendPath));

  // Catch all handler for React app
  app.get("*", (req, res) => {
    console.log("Serving React app for:", req.path);
    const indexPath = path.join(frontendPath, "index.html");
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.log("❌ index.html not found, serving 404");
      res.status(404).json({ 
        error: "Frontend not built properly",
        path: indexPath,
        exists: fs.existsSync(indexPath)
      });
    }
  });
} else {
  // Development mode - just serve a simple message
  app.get("*", (req, res) => {
    res.json({ 
      message: "Development mode - frontend not served",
      path: req.path 
    });
  });
}

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server started successfully on port ${PORT}`);
  console.log(`✅ Health check available at http://0.0.0.0:${PORT}/health`);
  console.log(`✅ Environment: ${process.env.NODE_ENV}`);
  
  // Connect to database (don't block server startup)
  connectDB().catch(err => {
    console.error("Database connection failed:", err);
  });
});

// Handle server errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});