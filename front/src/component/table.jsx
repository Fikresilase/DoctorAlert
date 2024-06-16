import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchDataAndExtractVariables = async () => {
  try {
    const apiUrl1 = 'https://api.thingspeak.com/channels/2577822/fields/1.json?api_key=G6T6YFDHU88QPQ42&results=2';
    const apiUrl2 = 'https://api.thingspeak.com/channels/2577822/fields/2.json?api_key=G6T6YFDHU88QPQ42&results=2';

    // Fetch data from both endpoints concurrently
    const [response1, response2] = await Promise.all([
      axios.get(apiUrl1),
      axios.get(apiUrl2)
    ]);

    // Extract required variables
    const patientNo = response1.data.feeds[0]?.field1.toString()//.charAt(0) || '0'; // Get first character as string, fallback to '0'
    const emergencyNo = response2.data.feeds[0]?.field2.toString()//.charAt(0) || '0'; // Get first character as string, fallback to '0'
    const time = new Date().toISOString(); // Represents the time you received the data

    return { patientNo, emergencyNo, time };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data'); // Throw error to propagate to caller
  }
};

const Table = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchDataAndExtractVariables();
        setData(fetchedData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Data:</h2>
      <p>Patient Number: {data.patientNo}</p>
      <p>Emergency Number: {data.emergencyNo}</p>
      <p>Time: {data.time}</p>
    </div>
  );
};

export default Table;
