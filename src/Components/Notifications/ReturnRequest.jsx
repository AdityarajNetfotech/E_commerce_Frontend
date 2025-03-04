import React, { useState } from "react";
import CheckCircle from "../Images/CheckCircle.png";

function ReturnRequest() {
  const [reason, setReason] = useState("Size issue");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-[350px]">
         {/* Image Icon */}
            <div className="flex justify-center">
            <img src={CheckCircle} alt="Exchange Icon" className="w-16 h-16" />
            </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-blue-600 mt-4">Return Request</h2>
        <p className="text-gray-700 mt-2">Select Reason for Return</p>

        {/* Dropdown for selecting return reason */}
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full mt-3 p-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option>Size issue</option>
          <option>Wrong item received</option>
          <option>Quality issue</option>
          <option>Other</option>
        </select>

        {/* Confirm Button */}
        <button
          onClick={() => alert(`Return requested for: ${reason}`)}
          className="mt-4 bg-[#FF902A] text-white px-4 py-2 rounded-md hover:bg-orange-600 w-full"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ReturnRequest;
