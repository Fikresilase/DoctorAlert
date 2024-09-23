import React, { useState } from "react";

function CameraConnection() {
  const [ipAddress, setIpAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

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
          "Authorization": `Bearer ${token}`, // Include JWT if required by the camera API
        },
      });

      if (response.ok) {
        setConnected(true);
        setError("");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <h1 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Connect to Security Camera
        </h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="ip">
            Camera IP Address
          </label>
          <input
            type="text"
            id="ip"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="e.g., 192.168.1.10"
            className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-100 focus:border-blue-100"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-100 focus:border-blue-100"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-100 focus:border-blue-100"
          />
        </div>

        <button
          onClick={handleConnect}
          className="w-full bg-blue-600 text-white rounded-lg font-medium px-4 py-2 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
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