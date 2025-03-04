import React from "react";
import CheckCircle from "../Images/Check.png"; // Update path based on your project
import { useNavigate } from "react-router-dom"; // For navigation

function ExchangeRequestSuccessful() {

    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
  
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-[350px]">
        
        <div className="flex justify-center">
          <img src={CheckCircle} alt="Success Icon" className="w-16 h-16" />
        </div>

       
        <h2 className="text-lg font-semibold text-gray-700 mt-4">
          Exchange Request Placed Successfully
        </h2>

        
        <p className="text-gray-600 mt-2">
          <span className="font-semibold text-blue-600">Order ID :</span>{" "}
          <span className="text-blue-500">2039535</span>
        </p>

        
        <p className="text-gray-600 mt-2">
          Estimated Pickup : <span className="font-semibold">25th October 2023</span>
        </p>

        
        <button
          onClick={() => navigate("/StudentMainLandingPage")}
          className="mt-4 bg-[#FF902A] text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default ExchangeRequestSuccessful;
