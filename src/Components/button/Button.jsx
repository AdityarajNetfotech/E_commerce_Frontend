import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[300px] ">
      {[
        { label: "My Orders", path: "/MyOrders" },
        { label: "Customer Care", path: "/Product" },
        { label: "Account Details", path: "/account-details" },
      ].map(({ label, path }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className="w-full py-4 px-5 rounded-lg bg-white shadow-lg text-center font-semibold hover:bg-orange-400 transition"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SidebarButtons;