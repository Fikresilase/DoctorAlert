const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API endpoint to analyze patient behavior
app.post('/api/analyze', async (req, res) => {
    const { room_no, behavior_data } = req.body;

    if (!room_no || !behavior_data) {
        return res.status(400).json({ error: 'Room number and behavior data are required' });
    }

    // Here you could call your Python service or logic to analyze the behavior
    // For simplicity, let's assume this is a mock response
    const priority_level = behavior_data.motion_detected ? 'High' : 'Low';

    // Notify the doctor (implement your notification logic)
    notifyDoctor(room_no, priority_level);

    return res.json({
        room_no,
        priority_level,
    });
});

// Function to notify the doctor (placeholder)
const notifyDoctor = (room_no, priority_level) => {
    console.log(`Notify doctor: Room ${room_no}, Priority Level: ${priority_level}`);
};

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));