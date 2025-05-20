// models/courseModel.js
const db = require("./db");

const findAllCoursesInMetadata = async () => {
  const queryText =
    "SELECT course_id, name, field FROM course_table ORDER BY name ASC;";
  const { rows } = await db.query(queryText);
  return rows;
};
const findAllCoursesWithStudentData = async () => {
  const queryText = `
        SELECT DISTINCT sd.course_id, ct.name, ct.field
        FROM student_data sd
        LEFT JOIN course_table ct ON sd.course_id = ct.course_id
        ORDER BY ct.name ASC, sd.course_id ASC;
    `;
  const { rows } = await db.query(queryText);
  return rows.map((row) => ({
    course_id: row.course_id,
    name: row.name || row.course_id, // Fallback to course_id if name is null from LEFT JOIN
    field: row.field,
  }));
};

const findById = async (courseId) => {
  const queryText = "SELECT * FROM course_table WHERE course_id = $1;";
  const { rows, rowCount } = await db.query(queryText, [courseId]);
  return rowCount > 0 ? rows[0] : null;
};

const create = async ({
  course_id,
  name,
  num_videos,
  num_exercises,
  field,
  about,
  prerequisites,
}) => {
  const queryText = `
        INSERT INTO course_table (course_id, name, num_videos, num_exercises, field, about, prerequisites)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
  const values = [
    course_id,
    name,
    num_videos,
    num_exercises,
    field,
    about,
    prerequisites,
  ];
  const { rows } = await db.query(queryText, values);
  return rows[0];
};

const update = async (
  courseId,
  { name, num_videos, num_exercises, field, about, prerequisites }
) => {
  // Build SET clauses dynamically to only update provided fields
  const fieldsToUpdate = [];
  const values = [];
  let paramIndex = 1;

  if (name !== undefined) {
    fieldsToUpdate.push(`name = $${paramIndex++}`);
    values.push(name);
  }
  if (num_videos !== undefined) {
    fieldsToUpdate.push(`num_videos = $${paramIndex++}`);
    values.push(num_videos);
  }
  if (num_exercises !== undefined) {
    fieldsToUpdate.push(`num_exercises = $${paramIndex++}`);
    values.push(num_exercises);
  }
  if (field !== undefined) {
    fieldsToUpdate.push(`field = $${paramIndex++}`);
    values.push(field);
  }
  if (about !== undefined) {
    fieldsToUpdate.push(`about = $${paramIndex++}`);
    values.push(about);
  }
  if (prerequisites !== undefined) {
    fieldsToUpdate.push(`prerequisites = $${paramIndex++}`);
    values.push(prerequisites);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields provided for update."); // Or return existing record
  }

  values.push(courseId); // For WHERE clause
  const queryText = `
        UPDATE course_table
        SET ${fieldsToUpdate.join(", ")}
        WHERE course_id = $${paramIndex}
        RETURNING *;
    `;
  const { rows, rowCount } = await db.query(queryText, values);
  return rowCount > 0 ? rows[0] : null;
};

const remove = async (courseId) => {
  const queryText =
    "DELETE FROM course_table WHERE course_id = $1 RETURNING *;";
  const { rows, rowCount } = await db.query(queryText, [courseId]);
  return rowCount > 0 ? rows[0] : null;
};

module.exports = {
  findAllCoursesInMetadata, // For general course listing
  findAllCoursesWithStudentData, // For dashboard filter
  findById,
  create,
  update,
  remove,
};
