import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarButtons = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get the current path

  const buttons = [
    { label: "My Orders", path: "/MyOrders" },
    { label: "Customer Care", path: "/CustomerCare" },
    { label: "Account Details", path: "/AccountDetail" },
  ];

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-[320px] h-[500px] rounded-lg pt-10 px-6 bg-peach-custom
                    md:w-[250px] md:h-[460px] 
                    sm:w-[180px] sm:h-[100px] sm:p-3 sm:gap-3">
      {buttons.map(({ label, path }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className={`w-full py-5 px-6 rounded-lg shadow-lg text-center font-semibold transition text-lg
                      md:py-4 md:px-5 md:text-base
                      sm:py-3 sm:px-4 sm:text-sm
                      xs:py-2 xs:px-3 xs:text-xs
                      ${
                        location.pathname === path
                          ? "bg-[#FF902A] text-white shadow-orange-300"
                          : "bg-white text-[#272727] hover:bg-orange-400 hover:text-white"
                      }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SidebarButtons;
