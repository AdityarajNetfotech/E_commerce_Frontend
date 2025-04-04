import React from "react";
import profileIcon from "../../Images/profileIcon.png";


const DashboardHeader = () => {

  return (
    <header className="flex items-center justify-between py-2 px-4 bg-[#ECECEC]">

      <div className="flex items-center gap-2">
        <button className="text-gray-500 text-lg">
          &#x276E;
        </button>
        <h1 className="text-gray-800 text-lg sm:text-[32px] font-medium">
          Dashboard
        </h1>
      </div>


      <div className="flex items-center gap-2">

        <img
          src={profileIcon}
          alt="School Logo"
          className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
        />


      </div>
    </header>
  );
};

export default DashboardHeader;


