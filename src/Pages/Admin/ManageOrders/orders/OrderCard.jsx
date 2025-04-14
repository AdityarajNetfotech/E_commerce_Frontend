import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryIcon from "../../../../Components/Images/PrimaryIcon.png";

const statusColors = {
  Delivered: "bg-green-100 text-green-600",
  Processing: "bg-yellow-100 text-yellow-600",
  "Exchange Processing": "bg-yellow-100 text-yellow-600",
  Cancelled: "bg-red-100 text-red-600",
  Pending: "bg-gray-100 text-gray-600",
};

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/OrderDetails", { state: { order } });
  };

  return (
    <tr className="border-b bg-[#FDF6E4]">
      <td className="p-3">#{order._id.slice(-6)}</td>

      <td className="p-3 flex items-center gap-2">
        <img
          src={order.orderItems[0]?.image?.[0] || "/placeholder.png"}
          alt="Product"
          className="w-14 h-14 object-cover rounded-lg"
        />
        <div>
          <p>{order.orderItems[0]?.name}</p>
          <p className="text-gray-500 text-sm">+{order.orderItems.length} items</p>
        </div>
      </td>

      <td className="p-3">
        <p className="font-semibold">{order.student?.name || "N/A"}</p>
        <p className="text-gray-500 text-sm">{order.student?.email || "N/A"}</p>
      </td>

      <td className="p-3">{order.school?.name || "N/A"}</td>

      <td className="p-3">₹{order.totalAmount}</td>

      <td className="p-3">
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"
          }`}
        >
          {order.orderStatus}
        </span>
      </td>

      <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>

      <td className="p-3">
        <button onClick={handleViewDetails} className="hover:scale-105 transition">
          <img src={PrimaryIcon} alt="Details" className="w-10 h-10" />
        </button>
      </td>
    </tr>
  );
};

export default OrderCard;
