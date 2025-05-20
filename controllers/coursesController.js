// controllers/coursesController.js
const courseModel = require("../models/courseModel"); // Use the new model

const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.findAllCoursesWithStudentData();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching all courses:", error);
    res.status(500).json({ message: "Failed to retrieve courses" });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with ID ${id} not found.` });
    }
    res.json(course);
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    res.status(500).json({ message: "Failed to retrieve course" });
  }
};

const createCourse = async (req, res) => {
  try {
    // Add validation for req.body fields here if needed
    const newCourse = await courseModel.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    // Handle specific errors like duplicate course_id if your DB enforces uniqueness
    if (error.code === "23505") {
      // PostgreSQL unique violation
      return res.status(409).json({
        message: `Course with ID ${req.body.course_id} already exists.`,
      });
    }
    res.status(500).json({ message: "Failed to create course" });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCourse = await courseModel.update(id, req.body);
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ message: `Course with ID ${id} not found, cannot update.` });
    }
    res.json(updatedCourse);
  } catch (error) {
    console.error(`Error updating course with ID ${id}:`, error);
    res.status(500).json({ message: "Failed to update course" });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await courseModel.remove(id);
    if (!deletedCourse) {
      return res
        .status(404)
        .json({ message: `Course with ID ${id} not found, cannot delete.` });
    }
    res.json(deletedCourse); // Or res.status(204).send();
  } catch (error) {
    console.error(`Error deleting course with ID ${id}:`, error);
    if (error.code === "23503") {
      // PostgreSQL foreign key violation
      return res.status(409).json({
        message: `Cannot delete course ID ${id} as it's referenced elsewhere (e.g., student data).`,
      });
    }
    res.status(500).json({ message: "Failed to delete course" });
  }
};

// You might add another controller if you need to list ALL courses from course_table for admin
const getAllCourseMetadata = async (req, res) => {
  try {
    const courses = await courseModel.findAllCoursesInMetadata();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching all course metadata:", error);
    res.status(500).json({ message: "Failed to retrieve all course metadata" });
  }
};

module.exports = {
  getAllCourses,
  getAllCourseMetadata,
  getCourseById,
  createCourse, // Add new handler
  updateCourse,
  deleteCourse,
};
