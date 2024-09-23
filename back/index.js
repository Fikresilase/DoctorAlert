const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cameraRoutes = require('./routes/camera');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Use routes
app.use('/auth', authRoutes);
app.use('/camera', cameraRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
