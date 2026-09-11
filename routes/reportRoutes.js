const express = require("express");

const {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
  addRiskEvent,
  getRiskEvents,
} = require("../controllers/reportController");

const router = express.Router();

// Reports
router.post("/", createReport);

router.get("/", getReports);

router.get("/:id", getReportById);

router.patch("/:id/status", updateReportStatus);

// Risk events
router.post("/:id/risk-events", addRiskEvent);

router.get("/:id/risk-events", getRiskEvents);

module.exports = router;
