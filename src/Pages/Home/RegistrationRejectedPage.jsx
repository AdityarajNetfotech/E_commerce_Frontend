import React from "react";
import educartLogo from "../../Components/Images/educartlogo.png";
import { useNavigate } from "react-router-dom";
import Rejected from "../../Components/Images/Rejected.png";
function RegistrationRejectedPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#F7C322] flex flex-col items-center justify-center px-4 py-10 gap-10 relative">
            {/* Logo */}
            <div className="mx-auto md:left-20 flex items-center">
                <img src={educartLogo} alt="EduKart Logo" className="w-16 h-16 md:w-24 md:h-24" />
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 ml-2">
                    Edu<span className="text-blue-600">Kart</span>
                </h1>
            </div>

            {/* Verification Box */}
            <div className="flex flex-col w-full max-w-[473px] bg-white rounded-[20px] p-8 gap-6 shadow-lg text-center items-center">
                <img src={Rejected} alt="Verification" className="w-24 h-24 md:w-28 md:h-28" />
                <h1 className="font-semibold text-xl md:text-2xl leading-[28px]">Verification Under Process</h1>
                <h2 className="text-lg md:text-xl font-normal leading-tight">Document verification failed. Please try again!</h2>
                
                {/* Button */}
                <button className="w-full max-w-[393px] h-[52px] rounded-[8px] bg-[#FF902A] px-6 py-3 text-white text-base md:text-lg font-medium0"
                    onClick={() => navigate("/Register")}
                >
                    Retry Registration
                </button>
            </div>
        </div>
    );
}

export default RegistrationRejectedPage;
