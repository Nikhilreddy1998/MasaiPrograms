const StudentModel = require("../models/student.model");
const CourseModel = require("../models/course.model");
const EnrollModel = require("../models/enrollment.model");

const addNewStudent = async (req, res) => {
  try {
    let student = await StudentModel.create(req.body);
    res.status(201).json({ message: "Student added", result: student });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const addNewCourse =  async (req, res) => {
  try {
    let course = await CourseModel.create(req.body);
    res.status(201).json({ message: "Course added", result: course });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const enrollStu = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    let student = await StudentModel.findById(studentId);
    let course = await CourseModel.findById(courseId);
    console.log(student.isActive && course.isActive);
    if (!student.isActive || !course.isActive)
      return res.status(404).json({ message: "student or course not found" });
    const enrollment = await EnrollModel.create(req.body);
    res
      .status(201)
      .json({
        message: `${student.name} is enroll in ${course.title}`,
        result: enrollment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const softDeleteCourse =  async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await CourseModel.findByIdAndUpdate(courseId, {
      isActive: false,
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    await EnrollModel.updateMany({ courseId }, { isActive: false });
    res
      .status(200)
      .json({
        message: `${course.title} has been deactivated and related enrollments marked inactive.`,
        course,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const  softDeleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    let student = await StudentModel.findByIdAndUpdate(studentId, {
      isActive: false,
    });
    if (!student) return res.status(404).json({ error: "Student not found" });
    await EnrollModel.updateMany({ studentId }, { isActive: false });

    res
      .status(200)
      .json({
        message: `${student.name} has been deactivated and related enrollments marked inactive.`,
        student,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const returnStu =  async (req, res) => {
  try {
    const { id } = req.params;
    let student = await StudentModel.findOne({ _id: id, isActive: true });
    if (!student) return res.status(404).json({ error: "Student not found" });
    const enrollments = await EnrollModel.find(
      { studentId: id, isActive: true },
      { _id: 0, isActive: 0, enrolledAt: 0, __v: 0, studentId: 0 }
    ).populate("courseId", "-_id -__v");
    res.status(200).json({ name: student.name, List: enrollments });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const returnCour = async (req, res) => {
  try {
    const { id } = req.params;
    let course = await CourseModel.findOne({ _id: id, isActive: true });
    if (!course) return res.status(404).json({ error: "Course not found" });
    const enrollments = await EnrollModel.find(
      { courseId: id, isActive: true },
      { _id: 0, isActive: 0, enrolledAt: 0, __v: 0, courseId: 0 }
    ).populate("studentId", "-_id -__v");
    res.status(200).json({ name: course.title, List: enrollments });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}


module.exports  = {
    addNewCourse,
    addNewStudent,
    returnStu,
    returnCour,
    softDeleteCourse,
    softDeleteStudent,
    enrollStu
}