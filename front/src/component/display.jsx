import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Display = ({ token, streamUrl }) => {
  const [videoSrc, setVideoSrc] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const response = await fetch(`http://localhost:3000/stream-video?streamUrl=${encodeURIComponent(streamUrl)}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        });

        if (response.ok) {
          setVideoSrc(`http://localhost:3000/stream-video?streamUrl=${encodeURIComponent(streamUrl)}`);
        } else {
          console.error('Failed to fetch video stream');
        }
      } catch (error) {
        console.error('Error fetching video stream:', error);
      }
    };

    fetchStream();
  }, [token, streamUrl]);

  // Function to handle navigation back to the home component
  const handleBack = () => {
    navigate('/'); // Navigate to the home or CameraConnection component
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            {/* Back arrow button */}
            <button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
              ← Back
            </button>
            <h2 className="text-xl font-semibold text-gray-700 text-center flex-1">
              Camera Stream
            </h2>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
          {videoSrc ? (
            <video
              controls
              autoPlay
              className="w-full rounded-lg border-2 border-gray-300 shadow-md"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="text-center text-gray-500">Loading video...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Display;
