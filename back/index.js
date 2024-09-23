const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory user store (replace with DB for production)
const users = [];

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User created successfully' });
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Protected data route
app.get('/data', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, here is your protected data!` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
