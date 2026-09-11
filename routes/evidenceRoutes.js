const express = require("express");

const {
  uploadEvidence,
  getEvidence,
} = require("../controllers/evidenceController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload evidence
router.post("/:id", upload.single("evidence"), uploadEvidence);

// Get evidence
router.get("/:id", getEvidence);

module.exports = router;
