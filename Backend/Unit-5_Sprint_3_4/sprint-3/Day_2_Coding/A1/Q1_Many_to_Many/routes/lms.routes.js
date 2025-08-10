const express = require("express");
const { addNewCourse, addNewStudent, enrollStu, softDeleteStudent, softDeleteCourse, returnStu, returnCour } = require("../controllers/lms.controller");
const lmsRouter = express.Router();

// Add new Student
lmsRouter.post("/add-student",addNewStudent);

// Add new Course
lmsRouter.post("/add-course",addNewCourse);

// Enroll student & course
lmsRouter.post("/enroll",enrollStu);

// Soft delete for Student
lmsRouter.delete("/courses/:courseId",softDeleteCourse);

// Soft delete for course
lmsRouter.delete("/students/:studentId",softDeleteStudent);

// return all active course for the student
lmsRouter.get("/students/:id/courses",returnStu);

//  return all active students for the course
lmsRouter.get("/courses/:id/students",returnCour);

module.exports = lmsRouter;
