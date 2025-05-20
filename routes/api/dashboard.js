// routes/api/dashboard.js
const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/dashboardController");

// Matches /api/dashboard/kpis
router.get("/kpis", dashboardController.handleKpis);

// Matches /api/dashboard/prediction-distribution
router.get(
  "/prediction-distribution",
  dashboardController.handlePredictionDistribution
);

// Matches /api/dashboard/at-risk-snapshot
router.get("/at-risk-snapshot", dashboardController.handleAtRiskSnapshot);

// Matches /api/dashboard/engagement-trends
router.get("/engagement-trends", dashboardController.handleEngagementTrends);

// Add route for OverallEngagementComparison if implemented

module.exports = router;
