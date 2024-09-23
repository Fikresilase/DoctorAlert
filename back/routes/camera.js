const express = require('express');
const http = require('http');
const { authenticateToken } = require('../utils/jwt');

const router = express.Router();

// Connect to Camera route
router.post('/connect-camera', authenticateToken, (req, res) => {
  const { ipAddress, username, password } = req.body;

  if (!ipAddress || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const options = {
    hostname: ipAddress,
    path: '/login',
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
router.get('/stream-video', authenticateToken, (req, res) => {
  const { streamUrl } = req.query;

  if (!streamUrl) {
    return res.status(400).json({ message: 'Stream URL is required' });
  }

  http.get(streamUrl, (response) => {
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
    });
    response.pipe(res);
  }).on('error', (err) => {
    res.status(500).json({ message: 'Error streaming video', error: err.message });
  });
});

module.exports = router;
