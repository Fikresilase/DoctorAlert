import React from "react";
import { useNavigate } from 'react-router-dom';
import hero from "../../Images/hero.svg";

function Landing() {
    const navigate = useNavigate();

  const gototable = () => {
    navigate('/table');
  };
  return (
    <>
      <div className="header py-2 lg:py-4 px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center sticky top-0 bg-blue-100 z-10">
        <div className="logo mb-4 lg:mb-0">
          <h1 className="font-bold font-sans text-2xl lg:text-4xl text-blue-900">
            DocAlert
          </h1>
        </div>
        <div className="navbar mb-4 lg:mb-0 flex flex-wrap justify-center lg:justify-start">
          <a
            href="#home"
            className="mx-2 lg:mx-4 px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base text-blue-900 transition duration-300 rounded-lg group"
          >
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-900"></span>
          </a>
          <a
            onClick={() => scrollToSection("features")}
            href="#features"
            className="mx-2 lg:mx-4 px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base text-blue-900 transition duration-300 rounded-lg group"
          >
            Features
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-900"></span>
          </a>
          <a
            onClick={() => scrollToSection("pricing")}
            href="#pricing"
            className="mx-2 lg:mx-4 px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base text-blue-900 transition duration-300  rounded-lg group"
          >
            Pricing
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-900"></span>
          </a>
        </div>
        <div className="registration flex flex-wrap justify-center lg:justify-end">
          <button className="px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base rounded font-sans border-none font-semibold text-blue-900 hover:text-white hover:bg-blue-600 hover:shadow-md duration-300 transition-colors">
            Login
          </button>
          <button className="px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base rounded font-sans border-none font-semibold text-blue-900 hover:text-white hover:bg-blue-600 hover:shadow-md duration-300 transition-colors">
            Signup
          </button>
        </div>
      </div>
      <div
        id="home"
        className="bg-blue-100 p-8 flex flex-col lg:flex-row items-center lg:py-3"
      >
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl lg:text-6xl font-serif text-blue-950 font-medium leading-snug lg:leading-tight mb-4 lg:mb-6">
            Priority Based Doctor alert system
          </h1>
          <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6 lg:mb-8">
            The ultimate resource for alerting doctors effectivly based on the priority need algorithms.
          </p>
          <div className="text-center lg:text-left">
            <button onClick={gototable} className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition duration-300">
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
