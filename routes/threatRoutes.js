const express = require("express");

const { analyzeThreatRequest } = require("../controllers/threatController");

const router = express.Router();

// Threat analysis
router.post("/analyze", analyzeThreatRequest);

module.exports = router;
