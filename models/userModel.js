// models/userModel.js
const db = require("./db");

const findById = async (userId) => {
  // Assuming user_info has user_id and name as the primary fields you need
  // Adjust query if user_info has more relevant static profile data
  const queryText =
    "SELECT user_id, name, gender, year_of_birth, school FROM user_info WHERE user_id = $1;";
  // If name, gender, yob, school are reliably in student_data and user_info is just for other things,
  // you might skip this separate call or adjust.
  // For now, this assumes user_info is the source for 'name'.
  const { rows, rowCount } = await db.query(queryText, [userId]);
  return rowCount > 0 ? rows[0] : null;
};
module.exports = { findById };
