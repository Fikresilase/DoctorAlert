// Display.jsx
import React, { useEffect, useState } from 'react';

const Display = ({ token, streamUrl }) => {
  const [videoSrc, setVideoSrc] = useState('');

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

  return (
    <div>
      {videoSrc ? (
        <video controls autoPlay width="600">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Display;