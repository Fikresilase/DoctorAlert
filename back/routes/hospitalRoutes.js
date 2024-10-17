const express = require('express');
const router = express.Router();
const {
  registerHospital,
  loginHospital,
  getMe,
} = require('../controllers/hospitalController'); // Update to your hospital controller

const { protect } = require('../middleware/authMiddleware'); // Keep the auth middleware

// Define routes for hospitals
router.post('/', registerHospital); // Register a new hospital
router.post('/login', loginHospital); // Hospital login
router.get('/me', protect, getMe); // Get authenticated hospital data

module.exports = router;