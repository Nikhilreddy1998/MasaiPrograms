const express = require("express");
const {
  addNewDoctor,
  addNewPatient,
  consultNow,
  softDeletedoctor,
  softDeletepatient,
  returnPatients,
  totalConsultation,
  activeMaleFemale,
  lastFiveConsultations,
  returnDoctors,
} = require("../controllers/medical.controller");
const medicalRouter = express.Router();

// Add new Dcotor
medicalRouter.post("/add-doctor", addNewDoctor);

// Add new Patient
medicalRouter.post("/add-patient", addNewPatient);

// Consult doctor patient
medicalRouter.post("/consult", consultNow);

// Soft delete for doctors
medicalRouter.delete("/doctors/:doctorId", softDeletedoctor);

// Soft delete for patient
medicalRouter.delete("/patients/:patientId", softDeletepatient);

// Return list of patients consulted by this doctor
medicalRouter.get("/doctors/:id/patients", returnPatients);

// Return list of doctors this patient has consulted
medicalRouter.get("/patients/:id/doctors",returnDoctors);

// Return total number of consultations this doctor has done
medicalRouter.get("/doctors/:id/consultations/count", totalConsultation);

// Return all active male patients
medicalRouter.get("/patients", activeMaleFemale);

// Return last 5 consultations (active only)
medicalRouter.get("/consultations/recent", lastFiveConsultations);

module.exports = medicalRouter;
