const asyncHandler = require('express-async-handler');

const Patient = require('../models/patientModel'); // Update to your patient model
const User = require('../models/hospitalModel'); // Assuming User is still needed for authorization

// @desc    Get patients
// @route   GET /api/patients
// @access  Private
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({ hospital: req.user.id }); // Assuming 'hospital' is the field in Patient model

  res.status(200).json(patients);
});

// @desc    Add patient
// @route   POST /api/patients
// @access  Private
const addPatient = asyncHandler(async (req, res) => {
  if (!req.body.name) { // Change 'text' to 'name' or other relevant fields
    res.status(400);
    throw new Error('Please add a name field');
  }

  const patient = await Patient.create({
    name: req.body.name,
    hospital: req.user.id, // Associate patient with the logged-in hospital
    // Add other patient fields as necessary
  });

  res.status(201).json(patient);
});

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error('Patient not found');
  }

  // Check for hospital
  if (!req.user) {
    res.status(401);
    throw new Error('Hospital not found');
  }

  // Make sure the logged-in hospital matches the patient hospital
  if (patient.hospital.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Hospital not authorized');
  }

  const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPatient);
});

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error('Patient not found');
  }

  // Check for hospital
  if (!req.user) {
    res.status(401);
    throw new Error('Hospital not found');
  }

  // Make sure the logged-in hospital matches the patient hospital
  if (patient.hospital.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Hospital not authorized');
  }

  await patient.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
};