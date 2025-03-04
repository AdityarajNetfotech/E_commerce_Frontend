import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation

function OrderFailed() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-[350px]">
        {/* Failure Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-orange-500">
            <svg
              className="w-10 h-10 text-orange-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

     
        <h2 className="text-xl font-bold text-blue-600 mt-4">Please Try Again !</h2>
        <p className="text-gray-700 mt-2">Transaction failed</p>

       
        <button
          onClick={() => navigate(-1)} // Goes back to the previous page
          className="mt-4 bg-[#FF902A] text-white px-4 py-2 w-50 rounded-md hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default OrderFailed;
