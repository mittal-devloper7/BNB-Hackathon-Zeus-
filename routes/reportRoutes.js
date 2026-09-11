const express = require("express");

const {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
  addRiskEvent,
  getRiskEvents,
} = require("../controllers/reportController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Create report
router.post("/", createReport);

// Coordinator/Admin only
router.get("/", protect, authorize("COORDINATOR", "ADMIN"), getReports);

// Coordinator/Admin only
router.get("/:id", protect, authorize("COORDINATOR", "ADMIN"), getReportById);

// Coordinator/Admin only
router.patch(
  "/:id/status",
  protect,
  authorize("COORDINATOR", "ADMIN"),
  updateReportStatus,
);

// Coordinator/Admin only
router.post(
  "/:id/risk-events",
  protect,
  authorize("COORDINATOR", "ADMIN"),
  addRiskEvent,
);

// Coordinator/Admin only
router.get(
  "/:id/risk-events",
  protect,
  authorize("COORDINATOR", "ADMIN"),
  getRiskEvents,
);

module.exports = router;
