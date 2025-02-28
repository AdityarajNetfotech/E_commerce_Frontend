import React, { useEffect, useState } from "react";
import school from "../../../../Components/Images/School.png";
import axios from "axios";

const Header = ({heading}) => {
  const [schoolData, setSchoolData] = useState(null);

  const fetchSchoolProfile = async () => {
    try {
      const token = localStorage.getItem("schoolToken");
      if (!token) {
        console.log("No token found, redirecting to login...");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/school/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSchoolData(response.data.schoolDetails);
      // console.log("School Data:", response.data.schoolDetails);
    } catch (error) {
      console.log("Error fetching school data:", error.response?.data?.message || error.message);
    }
  };


  useEffect(() => {
    fetchSchoolProfile();
  }, []);

  return (
    <header className="flex items-center justify-between py-2 px-4 bg-[#ECECEC]">

      <div className="flex items-center gap-2">
        <button className="text-gray-500 text-lg">
          &#x276E;
        </button>
        <h1 className="text-gray-800 text-lg sm:text-[32px] font-medium">
          {heading}
        </h1>
      </div>


      <div className="flex items-center gap-2">

        <img
          src={school}
          alt="School Logo"
          className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
        />


        <span className="hidden sm:inline text-gray-600 text-[22px]">
          {schoolData?.name
            ?.split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>

      </div>
    </header>
  );
};

export default Header;


