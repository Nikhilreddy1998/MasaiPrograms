const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}
);

const EnrollModel = mongoose.model("Enroll",enrollSchema)

module.exports = EnrollModel
