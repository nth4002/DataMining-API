// models/dashboardModel.js
const db = require("./db"); // Or const { query } = require('./db');

const getKpis = async (courseId, school) => {
  let baseQuery = `FROM student_data WHERE 1=1`; // Replace 'your_student_data_table'
  const queryParams = [];

  if (courseId) {
    queryParams.push(courseId);
    baseQuery += ` AND course_id = $${queryParams.length}`;
  }
  if (school) {
    queryParams.push(school);
    baseQuery += ` AND school = $${queryParams.length}`;
  }
  console.log(courseId);
  console.log(123);
  console.log(school);
  console.log(queryParams);
  const kpiQueries = [
    `SELECT COUNT(DISTINCT user_id) as total_students ${baseQuery}`,
    `SELECT COUNT(DISTINCT user_id) as pass_count ${baseQuery} AND classification = 'Pass'`,
    `SELECT COUNT(DISTINCT user_id) as fail_count ${baseQuery} AND classification = 'Fail'`,
  ];

  try {
    const [totalStudentsRes, passCountRes, failCountRes] = await Promise.all([
      db.query(kpiQueries[0], queryParams),
      db.query(kpiQueries[1], queryParams),
      db.query(kpiQueries[2], queryParams),
    ]);

    const totalStudents = parseInt(
      totalStudentsRes.rows[0]?.total_students || 0
    );
    console.log(`total Student = ${totalStudents}`);
    const passCount = parseInt(passCountRes.rows[0]?.pass_count || 0);
    const failCount = parseInt(failCountRes.rows[0]?.fail_count || 0);

    return {
      totalStudents,
      predictedPassRate:
        totalStudents > 0 ? (passCount / totalStudents) * 100 : 0,
      predictedFailRate:
        totalStudents > 0 ? (failCount / totalStudents) * 100 : 0,
      atRiskStudentCount: failCount,
    };
  } catch (err) {
    console.error("Error fetching KPIs:", err);
    throw err;
  }
};

const getPredictionDistribution = async (courseId, school) => {
  let queryText = `
        SELECT classification, COUNT(DISTINCT user_id) as count
        FROM student_data
        WHERE 1=1
    `;
  const queryParams = [];

  if (courseId) {
    queryParams.push(courseId);
    queryText += ` AND course_id = $${queryParams.length}`;
  }
  if (school) {
    queryParams.push(school);
    queryText += ` AND school = $${queryParams.length}`;
  }
  queryText += ` GROUP BY classification;`;

  try {
    const { rows } = await db.query(queryText, queryParams);
    return rows;
  } catch (err) {
    console.error("Error fetching prediction distribution:", err);
    throw err;
  }
};

const getAtRiskSnapshot = async (courseId, school, limit = 5) => {
  let queryText = `
        SELECT user_id, school, course_id
        FROM student_data
        WHERE classification = 'Fail'
    `;
  const queryParams = [];

  if (courseId) {
    queryParams.push(courseId);
    queryText += ` AND course_id = $${queryParams.length}`;
  }
  if (school) {
    queryParams.push(school);
    queryText += ` AND school = $${queryParams.length}`;
  }
  queryParams.push(limit);
  queryText += ` ORDER BY enroll_time DESC LIMIT $${queryParams.length};`; // Example ordering

  try {
    const { rows } = await db.query(queryText, queryParams);
    return rows;
  } catch (err) {
    console.error("Error fetching at-risk snapshot:", err);
    throw err;
  }
};

const getEngagementTrends = async (courseId, school) => {
  // This query is more complex, needs aggregation per week for pass/fail groups
  // Example for one metric (questions_done_week1)
  let queryText = `
        SELECT
            classification,
            AVG(questions_done_week1) as avg_q_w1,
            AVG(user_watching_time_week1) as avg_wt_w1,
            AVG(questions_done_week2) as avg_q_w2,
            AVG(user_watching_time_week2) as avg_wt_w2,
            AVG(questions_done_week3) as avg_q_w3,
            AVG(user_watching_time_week3) as avg_wt_w3,
            AVG(questions_done_week4) as avg_q_w4,
            AVG(user_watching_time_week4) as avg_wt_w4,
            AVG(questions_done_after_4weeks) as avg_q_after_w4,
            AVG(user_watching_time_after_4weeks) as avg_wt_after_w4
        FROM student_data
        WHERE 1=1
    `;
  const queryParams = [];
  if (courseId) {
    queryParams.push(courseId);
    queryText += ` AND course_id = $${queryParams.length}`;
  }
  if (school) {
    queryParams.push(school);
    queryText += ` AND school = $${queryParams.length}`;
  }
  queryText += ` GROUP BY classification;`;

  try {
    const { rows } = await db.query(queryText, queryParams);
    // Restructure data for frontend (e.g., separate pass/fail arrays)
    const trends = { pass_group: {}, fail_group: {} };
    rows.forEach((row) => {
      const group =
        row.classification.toLowerCase() === "pass"
          ? trends.pass_group
          : trends.fail_group;
      group.questions_done = [
        parseFloat(row.avg_q_w1 || 0),
        parseFloat(row.avg_q_w2 || 0),
        parseFloat(row.avg_q_w3 || 0),
        parseFloat(row.avg_q_w4 || 0),
        parseFloat(row.avg_q_after_w4 || 0),
      ];
      group.watch_time = [
        parseFloat(row.avg_wt_w1 || 0),
        parseFloat(row.avg_wt_w2 || 0),
        parseFloat(row.avg_wt_w3 || 0),
        parseFloat(row.avg_wt_w4 || 0),
        parseFloat(row.avg_wt_after_w4 || 0),
      ];
    });
    return trends;
  } catch (err) {
    console.error("Error fetching engagement trends:", err);
    throw err;
  }
};
const findUsersInCourse = async (courseId) => {
  // Select distinct users for the course.
  // Also fetch their classification for this course, and school.
  // If 'student_data' has a 'user_name' column, include it. Otherwise, we'd join with 'user_info'.
  // For simplicity now, assuming we only need what's in student_data for the list.
  const queryText = `
        SELECT DISTINCT user_id, school, classification
        FROM student_data
        WHERE course_id = $1
        ORDER BY user_id;
    `;
  // If you have 'user_name' in student_data:
  // SELECT DISTINCT user_id, user_name, school, classification ...
  const { rows } = await db.query(queryText, [courseId]);
  return rows;
};

const getCourseVideoStatsSummary = async (courseId, school) => {
  const queryParams = [courseId];
  let schoolCondition = "";
  if (school) {
    queryParams.push(school);
    schoolCondition = `AND school=$${queryParams.length}`;
  }
  const queryText = `
        SELECT
            COUNT(DISTINCT user_id) AS students_with_records,
            AVG(average_watch_time_per_video_per_course) AS course_avg_watch_time_per_video,
            AVG(total_watch_time_minutes_per_course) AS course_avg_total_watch_time,
            SUM(total_watch_time_minutes_per_course) AS course_sum_total_watch_time,
            PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_watch_time_minutes_per_course) AS median_total_watch_time
        FROM student_data
        WHERE course_id = $1 ${schoolCondition};
    `;
  try {
    const { rows } = await db.query(queryText, queryParams);
    if (rows.length > 0) {
      return {
        studentsWithRecords: parseInt(rows[0].students_with_records || 0),
        courseAvgWatchTimePerVideo: parseFloat(
          rows[0].course_avg_watch_time_per_video || 0
        ).toFixed(2),
        courseAvgTotalWatchTime: parseFloat(
          rows[0].course_avg_total_watch_time || 0
        ).toFixed(2),
        courseSumTotalWatchTime: parseFloat(
          rows[0].course_sum_total_watch_time || 0
        ).toFixed(2),
        medianTotalWatchTime: parseFloat(
          rows[0].median_total_watch_time || 0
        ).toFixed(2),
      };
    }
    return {
      // Default if no data
      studentsWithRecords: 0,
      courseAvgWatchTimePerVideo: 0,
      courseAvgTotalWatchTime: 0,
      courseSumTotalWatchTime: 0,
      medianTotalWatchTime: 0,
    };
  } catch (error) {
    console.error("Error fetching course video stats summary:", error);
    throw error;
  }
};

const findEnrollmentsByUserId = async (userId) => {
  const queryText = `
        SELECT
            course_id,
            enroll_time,
            classification,
            total_watch_time_minutes_per_course,
            (SELECT name FROM course_table ct WHERE ct.course_id = sd.course_id) as course_name 
        FROM student_data sd
        WHERE user_id = $1
        ORDER BY enroll_time DESC;
    `;
  const { rows } = await db.query(queryText, [userId]);
  return rows;
};

// This function might already exist or be similar to one fetching dashboard data,
// but focused on a single student for a single course.
const findStudentPerformanceInCourse = async (userId, courseId) => {
  const queryText = `
        SELECT *  -- Select all weekly data and overall stats
        FROM student_data
        WHERE user_id = $1 AND course_id = $2;
    `;
  const { rows, rowCount } = await db.query(queryText, [userId, courseId]);
  return rowCount > 0 ? rows[0] : null;
};
module.exports = {
  getKpis,
  getPredictionDistribution,
  getAtRiskSnapshot,
  getEngagementTrends,
  findUsersInCourse,
  getCourseVideoStatsSummary,
  findEnrollmentsByUserId,
  findStudentPerformanceInCourse,
};
