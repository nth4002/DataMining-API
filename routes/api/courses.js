// routes/api/courses.js
const express = require("express");
const router = express.Router();
const coursesController = require("../../controllers/coursesController");

// Handles requests to the base /api/courses path
router
  .route("/")
  .get(coursesController.getAllCourses) // For GET /api/courses (fetch all courses)
  .post(coursesController.createCourse); // For POST /api/courses (create a new course)

// Handles requests to /api/courses/:id (where :id is a course_id parameter)
router
  .route("/:id")
  .get(coursesController.getCourseById) // For GET /api/courses/:id (fetch specific course by ID)
  .put(coursesController.updateCourse) // For PUT /api/courses/:id (update specific course)
  .delete(coursesController.deleteCourse); // For DELETE /api/courses/:id (delete specific course)

module.exports = router;
