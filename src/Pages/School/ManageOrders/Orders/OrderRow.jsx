import React from "react";
import uniform from "../../../../Components/Images/BlueUniform.png";
import PrimaryIcon from "../../../../Components/Images/PrimaryIcon.png"; 

const statusColors = {
  Delivered: "bg-green-100 text-green-600",
  Processing: "bg-yellow-100 text-yellow-600",
  Cancelled: "bg-red-100 text-red-600",
};

const OrderRow = ({ order, index }) => {
  return (
    <tr className={`border-b ${index % 2 === 0 ? "bg-yellow-50" : "bg-[#F4F4F4]"}`}>
      <td className="p-1">{order.id}</td>
      <td className="p-1 flex items-center gap-2">
        <img src={uniform} alt="Product" className="w-14 h-14 object-cover rounded-lg" />
        <div>
          <p className="p-1">{order.product}</p>
          <p className="text-gray-500 text-sm">{order.items}</p>
        </div>
      </td>
      <td className="p-1">
        <p className="font-semibold">{order.customer.name}</p>
        <p className="text-gray-500 text-sm">{order.customer.email}</p>
      </td>
      <td className="p-1">{order.total}</td>
      <td className="p-1">
        <span className={`px-3 py-1 text-sm rounded-full ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </td>
      <td className="p-1">{order.date}</td>
      <td className="p-1">
        <button className="text-gray-600 hover:text-gray-800 transition">
          <img src={PrimaryIcon} alt="Details" className="w-10 h-10" />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
