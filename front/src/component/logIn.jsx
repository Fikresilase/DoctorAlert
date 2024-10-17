import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import google from "../../Images/google.svg";
import facebook from "../../Images/facebook.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/camera");
    }
  }, [navigate]);

  const goBackHome = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are required.");
      return;
    }

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/camera");
    } else {
      setError(data.message);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement your social login logic here
    // For example, redirect to a social login API or handle it through your backend
    console.log(`${provider} login initiated`);
    // On successful login, redirect to camera
    navigate("/camera");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-hero-bg bg-cover bg-center">
      <div className="bg-opacity-80 rounded-lg shadow-lg w-full max-w-sm p-4 relative">
        <button
          onClick={goBackHome}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FiArrowLeft size={24} />
        </button>

        <h1 className="text-lg font-semibold leading-tight text-gray-900 mb-3 text-center">
          Login to your account
        </h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form className="space-y-3" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border border-black text-black rounded-lg focus:ring-0 focus:border-black block w-full p-2"
              placeholder="emelia_erickson24"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-black text-black rounded-lg focus:ring-0 focus:border-black block w-full p-2"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-custom-greenblue text-white rounded-lg font-medium text-sm px-4 py-2 hover:bg-custom-darkblue focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center items-center mt-3">
          <div className="w-1/3">
            <hr className="border-t border-gray-300" />
          </div>
          <div className="mx-2 text-sm text-gray-500">or</div>
          <div className="w-1/3">
            <hr className="border-t border-gray-300" />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="w-full bg-custom-greenblue text-gray-900 rounded-lg font-medium text-sm px-4 py-2 hover:bg-custom-darkblue focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 flex items-center justify-center"
          >
            <img src={google} alt="Google Icon" className="h-4 w-4 inline-block mr-2" />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("Facebook")}
            className="w-full bg-custom-greenblue text-gray-900 rounded-lg font-medium text-sm px-4 py-2 hover:bg-custom-darkblue focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 flex items-center justify-center"
          >
            <img src={facebook} alt="Facebook Icon" className="h-4 w-4 inline-block mr-2" />
            Continue with Facebook
          </button>
        </div>

        <p className="text-xs font-light text-black mt-3 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="font-medium text-black hover:underline"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;