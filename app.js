const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const evidenceRoutes = require("./routes/evidenceRoutes");
const coordinatorRoutes = require("./routes/coordinatorRoutes");
const helpRoutes = require("./routes/helpRoutes");
const threatRoutes = require("./routes/threatRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BalRaksha Backend is running",
  });
});

app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/api/coordinator", coordinatorRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/threat", threatRoutes);

module.exports = app;
