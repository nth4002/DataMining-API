// controllers/userController.js
const userModel = require("../models/userModel");
const dashboardModel = require("../models/dashboardModel"); // Or your studentDataModel
const courseModel = require("../models/courseModel");

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

const getStudentCourseInsights = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    // 1. Validate User and Course
    const user = await userModel.findById(userId);
    const course = await courseModel.findById(courseId);
    console.log(`user = ${user}, course = ${course}`);
    if (!user || !course) {
      return res.status(404).json({ message: "User or Course not found" });
    }

    // 2. Fetch Student Performance in Course (Weekly Data and Overall Stats)
    const studentPerformance =
      await dashboardModel.findStudentPerformanceInCourse(userId, courseId);

    if (!studentPerformance) {
      return res.status(404).json({
        message: "No performance data found for this student and course",
      });
    }

    //3.  Aggregate and Reshape the Data for the Charts

    // Restructure the data to fit the chart data structure from frontend.
    const insights = {
      total_score_week1: studentPerformance.total_score_week1 || null,
      total_score_week2: studentPerformance.total_score_week2 || null,
      total_score_week3: studentPerformance.total_score_week3 || null,
      total_score_week4: studentPerformance.total_score_week4 || null,
      attempts_count_week1: studentPerformance.attempts_count_week1 || null,
      attempts_count_week2: studentPerformance.attempts_count_week2 || null,
      attempts_count_week3: studentPerformance.attempts_count_week3 || null,
      attempts_count_week4: studentPerformance.attempts_count_week4 || null,
      correct_answer_week1: studentPerformance.correct_answer_week1 || null,
      correct_answer_week2: studentPerformance.correct_answer_week2 || null,
      correct_answer_week3: studentPerformance.correct_answer_week3 || null,
      correct_answer_week4: studentPerformance.correct_answer_week4 || null,
      user_watching_time_week1:
        studentPerformance.user_watching_time_week1 || null,
      user_watching_time_week2:
        studentPerformance.user_watching_time_week2 || null,
      user_watching_time_week3:
        studentPerformance.user_watching_time_week3 || null,
      user_watching_time_week4:
        studentPerformance.user_watching_time_week4 || null,
      questions_done_week1: studentPerformance.questions_done_week1 || null,
      questions_done_week2: studentPerformance.questions_done_week2 || null,
      questions_done_week3: studentPerformance.questions_done_week3 || null,
      questions_done_week4: studentPerformance.questions_done_week4 || null,
      classification: studentPerformance.classification || null,
    };

    //Send the Response
    res.status(200).json(insights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
module.exports = {
  getUserProfile,
  getUserEnrollments,
  getStudentCoursePerformanceDetails,
  getStudentCourseInsights,
};
