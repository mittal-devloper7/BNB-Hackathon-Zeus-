const express = require("express");

const {
  uploadEvidence,
  getEvidence,
} = require("../controllers/evidenceController");

const upload = require("../middleware/uploadMiddleware");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Evidence upload
router.post("/:id", upload.single("evidence"), uploadEvidence);

// Coordinator/Admin can view evidence
router.get("/:id", protect, authorize("COORDINATOR", "ADMIN"), getEvidence);

module.exports = router;
