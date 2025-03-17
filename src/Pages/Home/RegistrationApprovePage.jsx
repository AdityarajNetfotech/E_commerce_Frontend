import React from "react";
import { useNavigate } from "react-router-dom";
import educartLogo from "../../Components/Images/educartlogo.png";
import Componentssss from "../../Components/Images/Componentssss.png";

function RegistrationApprovePage() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-[#F7C322] flex flex-col items-center justify-center px-4 py-10 gap-10 relative">
            {/* Logo */}
            <div className="absolute top-5 left-5 md:left-20 flex items-center">
                <img src={educartLogo} alt="EduKart Logo" className="w-16 h-16 md:w-24 md:h-24" />
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 ml-2">
                    Edu<span className="text-blue-600">Kart</span>
                </h1>
            </div>

            {/* Verification Box */}
            <div className="flex flex-col w-full max-w-[473px] bg-white rounded-[20px] p-8 gap-6 shadow-lg text-center items-center">
                <img src={Componentssss} alt="Verification" className="w-24 h-24 md:w-28 md:h-28" />
                <h1 className="font-semibold text-xl md:text-2xl leading-[28px]">Verification Under Process</h1>
                <h2 className="text-lg md:text-xl font-normal leading-tight">Your documents will be verified within 2-3 working days</h2>
                
                {/* Button */}
                <button 
                    className="w-full max-w-[393px] h-[52px] rounded-[8px] bg-[#FF902A] px-6 py-3 text-white text-base md:text-lg font-medium"
                    onClick={() => navigate("/Register")}
                >
                    Go to Register Page
                </button>
            </div>
        </div>
    );
}

export default RegistrationApprovePage;
