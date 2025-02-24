import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import edukart from "../Images/Edukart.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="lg:flex lg:flex-row">
      <div className="bg-yellow-500  text-black lg:h-screen w-full lg:w-[18rem] flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="flex items-center p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md">
              <img src={edukart} alt="Edukart Logo" />
            </div>
            <span className="text-2xl font-bold text-[#3E3A37]">
              Edu<span className="text-blue-700">Kart</span>
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4">
          <ul className="space-y-4 px-4">
            <li>
              <NavLink
                to="/dashboard"
                className={`block px-6 py-2 rounded-md cursor-pointer transition ${
                  location.pathname === "/dashboard"
                    ? "bg-black text-white"
                    : "hover:bg-yellow-400"
                }`}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ProdCatalogue"
                className={`block px-6 py-2 rounded-md cursor-pointer transition ${
                  location.pathname === "/ProdCatalogue"
                    ? "bg-black text-white"
                    : "hover:bg-yellow-400"
                }`}
              >
                Product Catalogue
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ManageOrders"
                className={`block px-6 py-2 rounded-md cursor-pointer transition ${
                  location.pathname === "/ManageOrders"
                    ? "bg-black text-white"
                    : "hover:bg-yellow-400"
                }`}
              >
                Manage Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/students"
                className={`block px-6 py-2 rounded-md cursor-pointer transition ${
                  location.pathname === "/students"
                    ? "bg-black text-white"
                    : "hover:bg-yellow-400"
                }`}
              >
                Manage Students
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={`block px-6 py-2 rounded-md cursor-pointer transition ${
                  location.pathname === "/account"
                    ? "bg-black text-white"
                    : "hover:bg-yellow-400"
                }`}
              >
                Account Details
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
