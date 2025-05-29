// controllers/userController.js
const userModel = require("../models/userModel");
const dashboardModel = require("../models/dashboardModel"); // Or your studentDataModel

const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await userModel.findById(userId);
    if (!profile)
      return res.status(404).json({ message: "User profile not found." });
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

const getUserEnrollments = async (req, res) => {
  const { userId } = req.params;
  try {
    const enrollments = await dashboardModel.findEnrollmentsByUserId(userId);
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching enrollments data of user" });
  }
};

const getStudentCoursePerformanceDetails = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const performance = await dashboardModel.findStudentPerformanceInCourse(
      userId,
      courseId
    );
    if (!performance)
      return res.status(404).json({
        message: "Performance data not found for this student and course.",
      });
    res.json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error fetching course performance data of user ${userId}`,
    });
  }
};

module.exports = {
  getUserProfile,
  getUserEnrollments,
  getStudentCoursePerformanceDetails,
};
