import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../../Images/hero.svg";

function Landing() {
  const navigate = useNavigate();

  const gotosignup = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="header py-2 lg:py-4 px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center sticky top-0 bg-blue-100 z-10">
        <div className="logo mb-4 lg:mb-0">
          <h2 className="font-bold font-sans text-2xl lg:text-4xl text-blue-900">
            DocAlert
          </h2>
        </div>
        <div className="navbar mb-4 lg:mb-0 flex flex-wrap justify-center lg:justify-start">
          {/*  */}
        </div>
        <div className="registration flex flex-wrap justify-center lg:justify-end">
          <button
          onClick={gotosignup}
          className="px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base rounded font-sans border-none font-semibold  hover:text-white text-white bg-blue-500 hover:bg-blue-700 hover:shadow-md duration-300 transition-colors">
            Register your Hospital
          </button>
        </div>
      </div>
      <div
        id="home"
        className="bg-blue-100 px-8 flex flex-col lg:flex-row items-center lg:py- "
      >
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl lg:text-6xl font-serif text-blue-950 font-medium leading-snug lg:leading-tight mb-4 lg:mb-6">
          AI-Driven Patient Monitoring
          </h1>
          <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6 lg:mb-8">
          Harnessing computer vision to detect patient behavior, provide timely alerts, and record vital data for improved healthcare outcomes.
          </p>
          <div className="text-center lg:text-left">
            <button
              onClick={gotosignup}
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition duration-300"
            >
              Start Now
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img src={hero} alt="Hero" className="w-full" />
        </div>
      </div>
    </>
  );
}

export default Landing;
