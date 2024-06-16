import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import arr from '../../Images/arrow.svg'

const fetchDataAndExtractVariables = async () => {
  try {
    const apiUrl1 =
      "https://api.thingspeak.com/channels/2577822/fields/1.json?api_key=G6T6YFDHU88QPQ42&results=2";
    const apiUrl2 =
      "https://api.thingspeak.com/channels/2577822/fields/2.json?api_key=G6T6YFDHU88QPQ42&results=2";

    // Fetch data from both endpoints concurrently
    const [response1, response2] = await Promise.all([
      axios.get(apiUrl1),
      axios.get(apiUrl2),
    ]);

    // Extract required variables
    const patientNo =
      response1.data.feeds[0]?.field1.toString()|| "0"; // Get first character as string, fallback to '0'
    const emergencyNo =
      response2.data.feeds[0]?.field2.toString()|| "0"; // Get first character as string, fallback to '0'
    const time = new Date().toISOString(); // Represents the time you received the data

    return { patientNo, emergencyNo, time };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data"); // Throw error to propagate to caller
  }
};

const sendMessageToTelegram = async (message) => {
  const botToken = '7334211815:AAEuuuLyn31m9-wnVeSlph2iIB4j3HMvhVY';
  const chatId = 1262984155; // Replace with your actual chat ID
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await axios.post(telegramApiUrl, {
      chat_id: chatId,
      text: message,
    });

    if (response.data.ok) {
      console.log('Message sent successfully!');
    } else {
      console.log('Failed to send message:', response.data);
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  }
};


const Table = () => {
  const navigate = useNavigate();
  const Gotolanding = () => {
    navigate("/");
  };

  const [dataList, setDataList] = useState([]); // State to store list of data objects
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchDataAndExtractVariables();

        // Send the room number (patientNo) to Telegram
        await sendMessageToTelegram(`Room Number: ${fetchedData.patientNo}`);

        // Add new data object to the beginning of the dataList array
        setDataList([fetchedData, ...dataList]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once, on component mount

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <img
          onClick={Gotolanding}
          src={arr}
          alt="Go to Landing Page"
          className="w-8 h-8 cursor-pointer"
        />
        <h1 className="text-2xl text-center font-bold mb-4">Data Table</h1>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Room number</th>
            <th className="border border-gray-300 px-4 py-2">Emergency Number</th>
            <th className="border border-gray-300 px-4 py-2">Call time</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{data.patientNo}</td>
              <td className="border border-gray-300 px-4 py-2">{data.emergencyNo}</td>
              <td className="border border-gray-300 px-4 py-2">{data.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
