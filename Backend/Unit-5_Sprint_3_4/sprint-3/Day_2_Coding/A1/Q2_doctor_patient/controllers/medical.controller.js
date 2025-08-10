const PatientModel = require("../models/patient.model");
const DoctorModel = require("../models/doctor.model");
const ConsultModel = require("../models/consultation.model");

const addNewDoctor = async (req, res) => {
  try {
    let doctor = await DoctorModel.create(req.body);
    res.status(201).json({ message: "doctor added", result: doctor });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const addNewPatient =  async (req, res) => {
  try {
    let patient = await PatientModel.create(req.body);
    res.status(201).json({ message: "patient added", result: patient });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const consultNow = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;
    let doctor = await DoctorModel.findById(doctorId);
    let patient = await PatientModel.findById(patientId);
    if (!doctor.isActive || !patient.isActive)
      return res.status(404).json({ message: "doctor or patient not found" });
    const consultation = await ConsultModel.create(req.body);
    res
      .status(201)
      .json({
        message: `${doctor.name} is consult to ${patient.name}`,
        result: consultation,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const softDeletepatient =  async (req, res) => {
  try {
    const { patientId } = req.params;
    let patient = await PatientModel.findByIdAndUpdate(patientId, {
      isActive: false,
    });
    if (!patient) return res.status(404).json({ error: "patient not found" });
    await ConsultModel.updateMany({ patientId }, { isActive: false });
    res
      .status(200)
      .json({
        message: `${patient.name} has been deactivated and related consultations marked inactive.`,
        patient,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

const  softDeletedoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    let doctor = await DoctorModel.findByIdAndUpdate(doctorId, {
      isActive: false,
    });
    if (!doctor) return res.status(404).json({ error: "doctor not found" });
    await ConsultModel.updateMany({ doctorId }, { isActive: false });

    res
      .status(200)
      .json({
        message: `${doctor.name} has been deactivated and related consultations marked inactive.`,
        doctor,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Return list of patients consulted by this doctor
 const returnPatients = async (req, res) => {
  try {
    const { id } = req.params;
    let doctor = await DoctorModel.findOne({ _id: id, isActive: true });
    if (!doctor) return res.status(404).json({ error: "doctor not found" });
    let consulted = await ConsultModel.find({ doctorId: id, isActive: true })
      .populate("patientId", "-_id name age gender")
      .select("_id")
      .sort({ consultedAt: 1 })
      .limit(2);
    res.status(200).json({ DcotorName: doctor.name, List: consulted });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// // Return list of doctors this patient has consulted
const returnDoctors = async (req, res) => {
  try {
    const { id } = req.params;
    let patient = await PatientModel.findOne({ _id: id, isActive: true });
    if (!patient) return res.status(404).json({ error: "patient not found" });
    const consultations = await ConsultModel.find({
      patientId: id,
      isActive: true,
    }).populate("doctorId", "-_id name specialization").select('_id')
    res.status(200).json({ Patientname: patient.name, List: consultations });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Return total number of consultations this doctor has done
const totalConsultation = async (req, res) => {
  try {
    const {id} = req.params
    let doctor = await DoctorModel.findById(id)
    if (!doctor) return res.status(404).json({ error: "doctor not found" });
    let count = await ConsultModel.countDocuments({doctorId:id})
    res.status(200).json({DoctorName:doctor.name,count})
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Return all active male  
const activeMaleFemale = async (req, res) => {
  try {
    const {gender} = req.query
    let activePatients  = await PatientModel.find({gender,isActive:true},{name:1,age:1,gender:1})
    res.status(200).json({activePatients})
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Return last 5 consultations (active only)
 const lastFiveConsultations = async (req, res) => {
  try {
    let lastFive = await ConsultModel.find({isActive:true}).sort({consultedAt:-1}).limit(5)
  res.status(200).json({lastFive})
    } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}



module.exports  = {
    addNewPatient,
    addNewDoctor,
    consultNow,
    softDeletepatient,
    softDeletedoctor,
    returnPatients,
    returnDoctors,
    totalConsultation,
    activeMaleFemale,
    lastFiveConsultations
    
}