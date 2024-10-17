import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FiArrowLeft } from "react-icons/fi";
import google from "../../Images/google.svg";
import facebook from "../../Images/facebook.svg";

function SignUp() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const goToLogin = () => {
    navigate("/login");
  };

  const goBackHome = () => {
    navigate("/"); // Navigate to home page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.username || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Make a POST request to your signup API
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to camera page after successful signup
        navigate("/camera");
      } else {
        setErrorMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during signup.");
    }
  };

  const handleSocialSignup = async (provider) => {
    try {
      // Redirect to the appropriate URL for Google or Facebook
      const redirectUri = "http://localhost:3000/auth/callback"; // Your callback URL
      let authUrl;

      if (provider === "Google") {
        authUrl = `http://localhost:3000/auth/google?redirect_uri=${redirectUri}`;
      } else if (provider === "Facebook") {
        authUrl = `http://localhost:3000/auth/facebook?redirect_uri=${redirectUri}`;
      }

      // Redirect to social authentication provider
      window.location.href = authUrl;

      // After successful login, handle the token and redirect in the callback URL logic
    } catch (error) {
      console.error("Social signup error:", error);
      setErrorMessage("An error occurred during social signup.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-hero-bg bg-cover bg-center">
      <div className="bg-opacity-80 rounded-lg shadow-lg w-full max-w-sm p-4 relative">
        {/* Back arrow button */}
        <button
          onClick={goBackHome}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FiArrowLeft size={24} />
        </button>

        <h1 className="text-lg font-semibold leading-tight text-gray-900 mb-3 text-center">
          Create a hospital account
        </h1>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-2">
            {errorMessage}
          </div>
        )}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Hospital name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border border-black text-black rounded-lg focus:ring-0 focus:border-black block w-full p-2"
              placeholder="Emelia Erickson"
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-transparent border border-black text-black rounded-lg focus:ring-0 focus:border-black block w-full p-2"
              placeholder="emelia_erickson24"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent border border-black text-black rounded-lg focus:ring-0 focus:border-black block w-full p-2"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-custom-greenblue text-white rounded-lg font-medium text-sm px-4 py-2 hover:bg-custom-darkblue focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300"
          >
            Create an account
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
            onClick={() => handleSocialSignup("Google")}
            className="w-full bg-custom-greenblue text-gray-900 rounded-lg font-medium text-sm px-4 py-2 hover:bg-custom-darkblue focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 flex items-center justify-center"
          >
            <img
              src={google}
              alt="Google Icon"
              className="h-4 w-4 inline-block mr-2"
            />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignup("Facebook")}
            className="w-full bg-custom-greenblue text-gray-900 rounded-lg font-medium text-sm px-4 py-2 hover:bg-custom-darkblue focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 flex items-center justify-center"
          >
            <img
              src={facebook}
              alt="Facebook Icon"
              className="h-4 w-4 inline-block mr-2"
            />
            Continue with Facebook
          </button>
        </div>

        <p className="text-xs font-light text-black mt-3 text-center">
          Already have an account?{" "}
          <button
            onClick={goToLogin}
            className="font-medium text-black hover:underline"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;