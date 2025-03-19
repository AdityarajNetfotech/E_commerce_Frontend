import React from "react";
import profileIcon from "../../../../Components/Images/profileIcon.png"; // Import Profile Icon

const Header = ({ heading }) => {
  return (
    <header className="flex items-center justify-between py-2 px-4 bg-[#ECECEC]">
      {/* Left Side - Back Button & Heading */}
      <div className="flex items-center gap-2">
        <button className="text-gray-500 text-lg">&#x276E;</button>
        <h1 className="text-gray-800 text-lg sm:text-[32px] font-medium">
          {heading}
        </h1>
      </div>

      {/* Right Side - Profile Icon */}
      <div className="flex items-center">
        <img
          src={profileIcon}
          alt="Profile Icon"
          className="h-6 w-6 sm:h-10 sm:w-10 object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
