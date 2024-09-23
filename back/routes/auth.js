const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readUsersFromFile, writeUsersToFile } = require('../utils/users');
const { JWT_SECRET, authenticateToken } = require('../utils/jwt');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  writeUsersToFile(users);
  res.status(201).json({ message: 'User created successfully' });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
