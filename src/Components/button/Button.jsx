import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[300px] h-[500px] rounded-lg pt-10 px-5 bg-[#FFF3CE]">
      {[
        { label: "My Orders", path: "/MyOrders" },
        { label: "Customer Care", path: "/CustomerCare" },
        { label: "Account Details", path: "/AccountDetail" },
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