const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Hospital = require('../models/hospitalModel'); // Update to your hospital model

// @desc    Register new hospital
// @route   POST /api/hospitals
// @access  Public
const registerHospital = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // Include relevant fields

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if hospital exists
  const hospitalExists = await Hospital.findOne({ email });

  if (hospitalExists) {
    res.status(400);
    throw new Error('Hospital already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create hospital
  const hospital = await Hospital.create({
    name,
    email,
    password: hashedPassword,
    // Add any additional fields needed for hospitals
  });

  if (hospital) {
    res.status(201).json({
      _id: hospital.id,
      name: hospital.name,
      email: hospital.email,
      token: generateToken(hospital._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid hospital data');
  }
});

// @desc    Authenticate a hospital
// @route   POST /api/hospitals/login
// @access  Public
const loginHospital = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for hospital email
  const hospital = await Hospital.findOne({ email });

  if (hospital && (await bcrypt.compare(password, hospital.password))) {
    res.json({
      _id: hospital.id,
      name: hospital.name,
      email: hospital.email,
      token: generateToken(hospital._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get hospital data
// @route   GET /api/hospitals/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    // Add additional hospital-specific data if needed
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerHospital,
  loginHospital,
  getMe,
};