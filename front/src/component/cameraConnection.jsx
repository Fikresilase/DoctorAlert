import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { IoArrowBack } from "react-icons/io5"; // Import back arrow icon from react-icons
import hero from "../../Images/haro.jpg";

function CameraConnection() {
  const [ipAddress, setIpAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook to navigate to another route

  const handleConnect = async () => {
    if (!ipAddress || !username || !password) {
      setError("Please fill all fields.");
      return;
    }

    const token = localStorage.getItem("token"); // Get the JWT token

    try {
      const response = await fetch(`http://${ipAddress}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include JWT if required by the camera API
        },
      });

      if (response.ok) {
        setConnected(true);
        setError("");

        // Redirect to the Display component, passing the IP address and token as state
        navigate("/display", { state: { streamUrl: `http://${ipAddress}/stream`, token } });
      } else {
        setConnected(false);
        setError("Failed to connect. Check your IP or credentials.");
      }
    } catch (err) {
      setError("Error connecting to the camera.");
      setConnected(false);
    }
  };

  return (
    <div
    id="home"
    className="relative flex flex-col lg:flex-row items-center justify-center px-8 bg-blue-100"
    style={{
      backgroundImage: `url(${hero})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
    }}
  >
      <div className="bg-opacity-80 rounded-lg shadow-lg w-full max-w-md p-4 relative">
        <button 
          onClick={() => navigate("/")} 
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <IoArrowBack size={24} />
        </button>

        <h1 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Connect to Security Camera
        </h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium text-gray-900" htmlFor="ip">
            Camera IP Address
          </label>
          <input
            type="text"
            id="ip"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="e.g., 192.168.1.10"
            className="bg-transparent border border-black text-black rounded-lg focus:ring-0 focus:border-black block w-full px-3 py-2"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium text-gray-900" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            className="bg-transparent border border-black text-black rounded-lg focus:ring-0 focus:border-black block w-full px-3 py-2"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium text-gray-900" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="bg-transparent border border-black text-black rounded-lg focus:ring-0 focus:border-black block w-full px-3 py-2"
          />
        </div>

        <button
          onClick={handleConnect}
          className="w-full bg-custom-greenblue text-white rounded-lg font-medium px-4 py-2 hover:bg-custom-darkblue transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Connect
        </button>

        {connected && (
          <p className="text-green-500 text-sm mt-3">
            Successfully connected to the camera at {ipAddress}.
          </p>
        )}
      </div>
    </div>
  );
}

export default CameraConnection;