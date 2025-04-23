import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import group from '../Images/educartlogo.png';
import schoolimg from '../Images/schoollimg.png';
import cart from "../Images/hardcart.png"
import profile from "../Images/hardprofile.png"
import axios from 'axios';



function CustomNavbar() {
  const [student, setStudent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate(); // ✅ Initialize the navigate function

  const handleNavigation = (path) => {
    navigate(path); // ✅ Navigate to the selected page
    setMenuOpen(false); // ✅ Close user dropdown
    setMobileMenuOpen(false); // ✅ Close mobile menu
  };

  const fetchStudentProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://e-commerce-backend-phi-five.vercel.app/api/student/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudent(response.data);
      // console.log("Student Profile:", response.data);
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const schoolName = student?.school?.name;
  // console.log("School Name:", schoolName);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://e-commerce-backend-phi-five.vercel.app/api/student/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Logout successful");

        // Remove token from local storage
        localStorage.removeItem("authToken");

        // Redirect to login page
        navigate("/Userlogin");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <header className="flex justify-between items-center px-2 py-2 md:px-20 md:py-10 bg-yellow-400 w-full">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={group} alt="Brand Logo" className="w-10 h-10 md:w-12 md:h-12" />
        <h1 className="text-xl md:text-3xl font-bold text-gray-800 ml-2">
          Edu<span className="text-blue-600">Kart</span>
        </h1>
      </div>

      {/* Desktop School Name */}
      <div className="hidden lg:flex items-center space-x-2">
        <img src={schoolimg} alt="School Logo" className="w-10 h-10" />
        <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
          {schoolName}
        </h2>
      </div>

      {/* Icons and Menu */}
      <div className="flex items-center space-x-4">
        <img src={cart} className="w-10 h-10 cursor-pointer" onClick={() => handleNavigation("/ShoppingCart")} />

        {/* User Dropdown - Desktop */}
        <div className="relative hidden md:block">
          <img src={profile}
            className=" h-10 w-10 cursor-pointer"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          />
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 z-10">
              <p className="px-4 py-2 text-gray-900 font-medium underline decoration-orange-400">
                Welcome
                <br />
                {student?.name?.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </p>
              <ul className="text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation("/MyOrders")}>My Orders</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation("/CustomerCare")}>Customer Care</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation("/AccountDetails")}>Account Details</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {mobileMenuOpen ? (
            <FaTimes
              className="text-gray-900 text-3xl cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            />
          ) : (
            <FaBars
              className="text-gray-900 text-3xl cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-auto bg-yellow-400 shadow-md p-6 z-20 flex flex-col space-y-4">
          <FaTimes
            className="text-gray-900 text-3xl cursor-pointer self-end"
            onClick={() => setMobileMenuOpen(false)}
          />
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Sam!!</h2>
          <ul className="text-gray-700 space-y-2">
            <li className="py-2 hover:bg-yellow-600 cursor-pointer" onClick={() => handleNavigation("/MyOrders")}>My Orders</li>
            <li className="py-2 hover:bg-yellow-600 cursor-pointer" onClick={() => handleNavigation("/CustomerCare")}>Customer Care</li>
            <li className="py-2 hover:bg-yellow-600 cursor-pointer" onClick={() => handleNavigation("/AccountDetails")}>Account Details</li>
            <li className="py-2 hover:bg-yellow-600 cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default CustomNavbar;
