const axios = require('axios');
const nodemailer = require('nodemailer');

// Function to analyze patient's physical activity and sound
exports.analyzePatientBehavior = async (req, res) => {
    const { videoUrl, audioUrl } = req.body;

    try {
        // Step 1: Analyze physical movements via a computer vision API
        const videoAnalysis = await analyzePhysicalActivity(videoUrl);

        // Step 2: Analyze sound via an audio API or a speech analysis library
        const soundAnalysis = await analyzeAudio(audioUrl);

        // Step 3: Determine severity level based on physical and sound analysis
        const severityLevel = determineSeverity(videoAnalysis, soundAnalysis);

        // Step 4: Notify healthcare professionals based on severity level
        notifyHealthcareProfessionals(severityLevel, videoAnalysis, soundAnalysis);

        // Respond with success message
        res.status(200).json({
            message: 'Analysis complete. Notifications sent.',
            videoAnalysis,
            soundAnalysis,
            severityLevel,
        });
    } catch (error) {
        console.error('Error analyzing patient behavior:', error);
        res.status(500).json({ error: 'Failed to analyze patient behavior' });
    }
};

// Function to analyze physical activity using a computer vision API
const analyzePhysicalActivity = async (videoUrl) => {
    try {
        // Send video URL to the computer vision API for analysis
        const response = await axios.post('https://vision-api.com/analyze', {
            videoUrl: videoUrl,
        });

        // Process the response and return the analysis data
        return response.data;
    } catch (error) {
        console.error('Error analyzing physical activity:', error);
        throw new Error('Failed to analyze physical activity');
    }
};

// Function to analyze audio (sound) using an audio analysis API
const analyzeAudio = async (audioUrl) => {
    try {
        // Send audio URL to the speech/audio analysis API for analysis
        const response = await axios.post('https://audio-analysis-api.com/analyze', {
            audioUrl: audioUrl,
        });

        // Process the response and return the analysis data
        return response.data;
    } catch (error) {
        console.error('Error analyzing audio:', error);
        throw new Error('Failed to analyze audio');
    }
};

// Function to determine severity based on video and sound analysis
const determineSeverity = (videoAnalysis, soundAnalysis) => {
    let severityLevel = 0;

    // Simple example: Increase severity based on specific conditions
    if (videoAnalysis.includes('fall') || videoAnalysis.includes('abnormal movement')) {
        severityLevel += 5;
    }

    if (soundAnalysis.includes('distressed tone') || soundAnalysis.includes('pain')) {
        severityLevel += 5;
    }

    return severityLevel;
};

// Function to notify healthcare professionals
const notifyHealthcareProfessionals = (severityLevel, videoAnalysis, soundAnalysis) => {
    let message = '';

    // Define different notification levels based on severity
    if (severityLevel > 8) {
        message = `URGENT: Severe patient condition detected. Physical: ${videoAnalysis}, Audio: ${soundAnalysis}. Severity: ${severityLevel}`;
        sendNotification('doctor', message);
        sendNotification('nurse', message);
        sendNotification('specialist', message);
    } else if (severityLevel > 5) {
        message = `ALERT: Moderate patient condition detected. Physical: ${videoAnalysis}, Audio: ${soundAnalysis}. Severity: ${severityLevel}`;
        sendNotification('nurse', message);
        sendNotification('doctor', message);
    } else {
        message = `INFO: Minor patient activity. Physical: ${videoAnalysis}, Audio: ${soundAnalysis}. Severity: ${severityLevel}`;
        sendNotification('nurse', message);
    }
};

// Function to send notifications via email (you can also use SMS, push notifications)
const sendNotification = (role, message) => {
    const email = getEmailForRole(role);  // Retrieve the email based on role
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword',
        },
    });

    const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: `Patient Alert for ${role}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending email to ${role}:`, error);
        } else {
            console.log(`Email sent to ${role}: ${info.response}`);
        }
    });
};

// Helper function to get email based on role (nurse, doctor, specialist)
const getEmailForRole = (role) => {
    switch (role) {
        case 'nurse':
            return 'nurse@example.com';
        case 'doctor':
            return 'doctor@example.com';
        case 'specialist':
            return 'specialist@example.com';
        default:
            return 'admin@example.com';
    }
};
