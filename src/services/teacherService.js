const pool = require("../config/database");

const getTeacherId = async (email) => {
  const [rows] = await pool.execute("SELECT id FROM teachers WHERE email = ?", [email]);
  if (rows.length > 0) return rows[0].id;
  const [result] = await pool.execute("INSERT INTO teachers (email) VALUES (?)", [email]);
  return result.insertId;
};

const getStudentIds = async (emails) => {
  const studentIds = [];
  for (const email of emails) {
    const [rows] = await pool.execute("SELECT id FROM students WHERE email = ?", [email]);
    if (rows.length > 0) {
      studentIds.push(rows[0].id);
    } else {
      const [result] = await pool.execute("INSERT INTO students (email) VALUES (?)", [email]);
      studentIds.push(result.insertId);
    }
  }
  return studentIds;
};

const registerTeacherStudent = async (teacherId, studentIds) => {
  for (const studentId of studentIds) {
    await pool.execute("INSERT IGNORE INTO teacher_students (teacher_id, student_id) VALUES (?, ?)", [teacherId, studentId]);
  }
};

const findCommonStudents = async (teacherEmails) => {
  const placeholders = teacherEmails.map(() => "?").join(",");
  const [teachers] = await pool.execute(`SELECT id FROM teachers WHERE email IN (${placeholders})`, teacherEmails);
  if (teachers.length !== teacherEmails.length) {
    throw new Error("One or more teachers not found");
  }

  const teacherIds = teachers.map((t) => t.id);
  const query = `
    SELECT s.email FROM students s
    JOIN teacher_students ts ON s.id = ts.student_id
    WHERE ts.teacher_id IN (${placeholders})
    GROUP BY s.id HAVING COUNT(DISTINCT ts.teacher_id) = ?
  `;

  const [students] = await pool.execute(query, [...teacherIds, teacherIds.length]);
  return students.map((s) => s.email);
};

const suspendStudentByEmail = async (email) => {
  const [student] = await pool.execute("SELECT id FROM students WHERE email = ?", [email]);
  if (student.length === 0) return false;
  await pool.execute("UPDATE students SET suspended = TRUE WHERE email = ?", [email]);
  return true;
};

module.exports = { getTeacherId, getStudentIds, registerTeacherStudent, findCommonStudents, suspendStudentByEmail };