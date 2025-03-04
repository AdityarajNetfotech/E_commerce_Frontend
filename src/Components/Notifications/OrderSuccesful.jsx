import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation

function OrderSuccessful() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-[350px]">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-green-500">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-xl font-bold text-blue-600 mt-4">Thank you !</h2>
        <p className="text-gray-700 mt-2">Order Placed Successfully</p>

        {/* Order ID */}
        <p className="text-gray-700 mt-2">
          <span className="font-semibold text-blue-500">Order ID :</span> 2039535
        </p>

        {/* Continue Shopping Button */}
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

export default OrderSuccessful;
