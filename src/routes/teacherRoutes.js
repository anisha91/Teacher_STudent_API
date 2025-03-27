const express = require("express");

const { registerTeachersAndStudents, getCommonStudents, suspendStudent, notification } = require("../controllers/teacherController");

const router = express.Router();

/* Setting up routes for handling HTTP requests in a Node.js application using
Express framework */
router.post("/register", registerTeachersAndStudents);
router.get("/commonstudents", getCommonStudents);
router.post("/suspend", suspendStudent);
router.post("/retrievefornotifications", notification);

module.exports = router;