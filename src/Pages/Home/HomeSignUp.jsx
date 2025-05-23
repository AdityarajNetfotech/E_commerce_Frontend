import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import educartLogo from "../../Components/Images/educartlogo.png";
import photo from "../../Components/Images/photo.png";
import schoolRegister from "../../Components/Images/schoolRegister.png";
import userRegister from "../../Components/Images/userRegister.png";
import reverseAeroplane from "../../Components/Images/reverseAeroplane.png";
import strip from "../../Components/Images/strip.png"; // Import strip.png

function HomeSignUp() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1028);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1028);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="min-h-screen overflow-hidden bg-[#F7C322] flex flex-col md:flex-row items-center justify-center px-12 py-10 gap-16 relative">
      {!isMobile && (
        <div className="absolute top-10 left-10 md:left-20 flex items-center">
          <img src={educartLogo} alt="EduKart Logo" className="w-24 h-24 md:w-28 md:h-28" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 ml-2">
            Edu<span className="text-blue-600">Kart</span>
          </h1>
        </div>
      )}

      {/* Reverse Aeroplane  */}
      <div className="hidden lg:block absolute top-36 right-200">
        <img
          src={reverseAeroplane}
          alt="Flying Paper Plane"
          className="w-24 md:w-28 lg:w-160 rotate-15"
        />
      </div>

      {/* School Image (Visible on Large Screens) */}
      {!isMobile && (
        <div className="hidden lg:flex justify-center w-full max-w-[600px] relative right-60 top-30">
          <div className="relative w-full flex justify-center">
            
            <img
              src={strip}
              alt="Strip"
              className="w-full max-w-[595px] object-contain"
            />

  
            <img
              src={photo}
              alt="School Environment"
              className="absolute bottom-[0px] left-[0px] w-[100%] max-w-[575px] object-contain"
            />
          </div>
        </div>
      )}

      {/* Registration Options */}
      <div className="bg-white py-8 px-10 text-center rounded-lg w-full max-w-md shadow-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Register / Login as</h1>
        <Link to="/SchoolRegister">
          <img src={schoolRegister} alt="School Register" className="w-[300px] md:w-[450px] h-auto mx-auto mb-4" />
        </Link>
        <Link to="/UserRegister">
          <img src={userRegister} alt="Parent Register" className="w-[300px] md:w-[450px] h-auto mx-auto" />
        </Link>
      </div>
    </section>
  );
}

export default HomeSignUp;
