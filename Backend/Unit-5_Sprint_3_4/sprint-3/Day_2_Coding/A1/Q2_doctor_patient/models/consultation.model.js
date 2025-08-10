const mongoose = require("mongoose");

const consultSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  consultedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}
);

const ConsultModel = mongoose.model("Consult",consultSchema)

module.exports = ConsultModel
