// routes/api/users.js
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.get("/:userId/profile", userController.getUserProfile);
router.get("/:userId/enrollments", userController.getUserEnrollments);
router.get(
  "/:userId/performance/:courseId",
  userController.getStudentCoursePerformanceDetails
);
router.get(
  "/student/:userId/course-insights/:courseId",
  userController.getStudentCourseInsights
);
module.exports = router;
