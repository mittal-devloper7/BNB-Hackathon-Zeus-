const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const evidenceRoutes = require("./routes/evidenceRoutes");
const coordinatorRoutes = require("./routes/coordinatorRoutes");
const helpRoutes = require("./routes/helpRoutes");
const threatRoutes = require("./routes/threatRoutes");

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "*",
  }),
);

// Body size limit
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "BalRaksha Backend API is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/api/coordinator", coordinatorRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/threat", threatRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

module.exports = app;
