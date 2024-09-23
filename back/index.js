// index.js
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const http = require('http'); // Use built-in HTTP module

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Path to the users.json file
const usersFilePath = path.join(__dirname, 'users.json');

// Read users from JSON file
const readUsersFromFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Write users to JSON file
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret'; // Change this to a more secure secret

// Signup route
app.post('/signup', async (req, res) => {
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
app.post('/login', async (req, res) => {
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

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
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

// Connect to Camera route
app.post('/connect-camera', authenticateToken, (req, res) => {
  const { ipAddress, username, password } = req.body;

  if (!ipAddress || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const options = {
    hostname: ipAddress,
    path: '/login', // Change this if your camera has a different login path
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const request = http.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      if (response.statusCode === 200) {
        // Assuming the camera returns a stream URL or similar data
        res.json({ message: 'Successfully connected to the camera', data: JSON.parse(data) });
      } else {
        res.status(401).json({ message: 'Failed to connect to the camera. Check your IP or credentials.' });
      }
    });
  });

  request.on('error', (err) => {
    res.status(500).json({ message: 'Error connecting to the camera', error: err.message });
  });

  request.write(JSON.stringify({ username, password }));
  request.end();
});

// Route to stream video from camera
app.get('/stream-video', authenticateToken, (req, res) => {
  const { streamUrl } = req.query; // Assuming the stream URL is passed as a query parameter

  if (!streamUrl) {
    return res.status(400).json({ message: 'Stream URL is required' });
  }

  http.get(streamUrl, (response) => {
    res.writeHead(200, {
      'Content-Type': 'video/mp4', // Change this based on the video format
    });
    response.pipe(res); // Pipe the video data to the response
  }).on('error', (err) => {
    res.status(500).json({ message: 'Error streaming video', error: err.message });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});