const express = require("express");

const { analyzeThreatRequest } = require("../controllers/threatController");

const { threatLimiter } = require("../middleware/rateLimitMiddleware");

const router = express.Router();

router.post("/analyze", threatLimiter, analyzeThreatRequest);

module.exports = router;
