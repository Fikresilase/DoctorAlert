import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../../Images/haro.jpg"; // Import the hero image

function Landing() {
  const navigate = useNavigate();

  const gotosignup = () => {
    navigate("/signup");
  };

  return (
    <>
      {/* Header section */}
      <div className="header py-2 lg:py-4 px-4 lg:px-8 bg-transparent flex shadow-md flex-col lg:flex-row justify-between items-center fixed top-0 w-full z-20">
        <div className="logo mb-4 lg:mb-0">
          <h2 className="font-bold font-sans text-2xl lg:text-4xl text-white">
            DocAlert
          </h2>
        </div>
        <div className="navbar mb-4 lg:mb-0 flex flex-wrap justify-center lg:justify-start">
          {/* Navbar content can be added here */}
        </div>
        <div className="registration flex flex-wrap justify-center lg:justify-end">
          <button
            onClick={gotosignup}
            className="px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base rounded font-sans border-none font-semibold hover:text-white text-custom-greenblue-900 bg-custom-greenblue hover:bg-custom-darkblue hover:shadow-md transition-all duration-300"
          >
            Register your Hospital
          </button>
        </div>
      </div>

      {/* Hero section with background image */}
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
        {/* Text section */}
        <div className="relative lg:w-1/2 lg:pr-12 z-10 text-center lg:text-left bg-opacity-80 p-6 rounded-md ">
          <h1 className="text-4xl lg:text-6xl font-serif text-white font-medium leading-snug lg:leading-tight mb-4 lg:mb-6">
            AI-Driven Patient Monitoring
          </h1>
          <p className="text-base lg:text-lg text-white leading-relaxed mb-6 lg:mb-8">
            Harnessing computer vision to detect patient behavior, provide timely
            alerts, and record vital data for improved healthcare outcomes.
          </p>
          <div className="text-center lg:text-left">
            <button
              onClick={gotosignup}
              className="inline-block bg-custom-greenblue hover:bg-custom-darkblue text-white font-medium py-2 px-6 rounded-full transition duration-300"
            >
              Start Now
            </button>
          </div>
        </div>

        {/* Optional: add a semi-transparent overlay for the background image */}
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      </div>
    </>
  );
}

export default Landing;
