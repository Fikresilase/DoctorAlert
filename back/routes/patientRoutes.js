const express = require('express');
const router = express.Router();
const {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController'); // Update to your patient controller

const { protect } = require('../middleware/authMiddleware'); // Keep auth middleware

// Define routes for patients
router.route('/').get(protect, getPatients).post(protect, addPatient);
router.route('/:id').put(protect, updatePatient).delete(protect, deletePatient);

module.exports = router;