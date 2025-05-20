// controllers/dashboardController.js
const dashboardModel = require("../models/dashboardModel");

const handleKpis = async (req, res) => {
  const { course_id, school } = req.query;
  // console.log(course_id);
  // console.log(school);
  try {
    const kpis = await dashboardModel.getKpis(course_id, school);
    res.json(kpis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching KPI data" });
  }
};

const handlePredictionDistribution = async (req, res) => {
  const { course_id, school } = req.query;
  try {
    const distribution = await dashboardModel.getPredictionDistribution(
      course_id,
      school
    );
    res.json(distribution);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching prediction distribution data" });
  }
};

const handleAtRiskSnapshot = async (req, res) => {
  const { course_id, school, limit } = req.query;
  try {
    const snapshot = await dashboardModel.getAtRiskSnapshot(
      course_id,
      school,
      parseInt(limit) || 5
    );
    res.json(snapshot);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching at-risk student snapshot" });
  }
};

const handleEngagementTrends = async (req, res) => {
  const { course_id, school } = req.query;
  try {
    const trends = await dashboardModel.getEngagementTrends(course_id, school);
    res.json(trends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching engagement trends" });
  }
};

// Add handler for OverallEngagementComparison if implemented

module.exports = {
  handleKpis,
  handlePredictionDistribution,
  handleAtRiskSnapshot,
  handleEngagementTrends,
  // handleOverallEngagementComparison
};
