import React, { useState } from "react";
import CheckCircle from "../Images/CheckCircle.png"; 

function ExchangeRequest() {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-[350px]">
        {/* Image Icon */}
        <div className="flex justify-center">
          <img src={CheckCircle} alt="Exchange Icon" className="w-16 h-16" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-blue-600 mt-4">Exchange Request</h2>

        {/* Size Dropdown */}
        <label className="block text-gray-600 text-sm mt-4 text-left">Select required size</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Select Size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>

        {/* Color Dropdown */}
        <label className="block text-gray-600 text-sm mt-4 text-left">Select required color</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 mt-1"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="">Select Color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>

        {/* Confirm Button */}
        <button
          onClick={() => alert(`Exchange request submitted for Size: ${size}, Color: ${color}`)}
          className="mt-4 bg-[#FF902A] text-white px-4 py-2 rounded-md hover:bg-orange-600 w-full"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ExchangeRequest;
