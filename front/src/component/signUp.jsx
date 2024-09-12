import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"; // Import the arrow icon
import google from "../../Images/google.svg";
import facebook from "../../Images/facebook.svg";

function SignUp({ onLoginOpen }) {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goBackHome = () => {
    navigate("/"); // Navigates back to the home page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 relative">
        {/* Back arrow button */}
        <button
          onClick={goBackHome}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FiArrowLeft size={24} />
        </button>

        <h1 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 mb-3 text-center">
          Create an account
        </h1>
        <form className="space-y-3" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Your full name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-100 focus:border-blue-100 block w-full p-2"
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
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-100 focus:border-blue-100 block w-full p-2"
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
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-100 focus:border-blue-100 block w-full p-2"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg font-medium text-sm px-4 py-2 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300"
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
            className="w-full bg-gray-50 text-gray-900 rounded-lg font-medium text-sm px-4 py-2 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 flex items-center justify-center"
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
            className="w-full bg-gray-50 text-gray-900 rounded-lg font-medium text-sm px-4 py-2 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 flex items-center justify-center"
          >
            <img
              src={facebook}
              alt="Facebook Icon"
              className="h-4 w-4 inline-block mr-2"
            />
            Continue with Facebook
          </button>
        </div>
        <p className="text-xs font-light text-gray-500 mt-3 text-center">
          Already have an account?{" "}
          <button
            onClick={goToLogin}
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
