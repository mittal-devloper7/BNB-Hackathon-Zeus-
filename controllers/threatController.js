const { Report, RiskEvent } = require("../models");

const { analyzeThreat } = require("../services/threatService");

const analyzeThreatRequest = async (req, res) => {
  try {
    const {
      riskScore,
      category,
      description,
      signals = [],
      anonymous = true,
    } = req.body;

    // Validate score
    if (riskScore === undefined || typeof riskScore !== "number") {
      return res.status(400).json({
        success: false,
        message: "A numeric riskScore is required",
      });
    }

    if (riskScore < 0 || riskScore > 100) {
      return res.status(400).json({
        success: false,
        message: "Risk score must be between 0 and 100",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Threat category is required",
      });
    }

    // Analyze risk
    const result = analyzeThreat({
      riskScore,
      signals,
    });

    const requiresImmediateAttention = result.riskLevel >= 90;

    // Create report
    const report = await Report.create({
      userId: anonymous ? null : req.user ? req.user.id : null,

      riskScore: result.riskScore,

      riskLevel: result.riskLevel,

      category,

      description: description || null,

      anonymous,

      status: "OPEN",
    });

    // Create risk events
    for (const signal of signals) {
      await RiskEvent.create({
        reportId: report.id,

        signal: signal.signal,

        description: signal.description || null,

        weight: signal.weight || 0,
      });
    }

    return res.status(201).json({
      success: true,

      message: "Threat analyzed and report created",

      result: {
        riskScore: result.riskScore,

        riskLevel: result.riskLevel,

        category,

        requiresImmediateAttention,
      },

      reportId: report.id,

      signals,
    });
  } catch (error) {
    console.error("Threat analysis error:", error);

    return res.status(500).json({
      success: false,

      message: "Threat analysis failed",
    });
  }
};

module.exports = {
  analyzeThreatRequest,
};
