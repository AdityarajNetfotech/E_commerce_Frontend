import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryIcon from "../../../../Components/Images/PrimaryIcon.png";

const statusColors = {
  Delivered: "bg-green-100 text-green-600",
  Processing: "bg-yellow-100 text-yellow-600",
  Shipped: "bg-blue-100 text-blue-600",
  Cancelled: "bg-red-100 text-red-600",
};

const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

const OrderRow = ({ order, index, onStatusChange }) => {
  const navigate = useNavigate();

  const productImage =
    order.orderItems.length > 0 && order.orderItems[0].image
      ? order.orderItems[0].image
      : "/default-image.jpg";

  const handleViewDetails = () => {
    navigate(`/OrderDetails`, { state: { order } });
  };

  const handleStatusSelect = (e) => {
    const newStatus = e.target.value;
    if (newStatus !== order.orderStatus) {
      onStatusChange(order._id, newStatus);
    }
  };

  return (
    <tr className={`border-b ${index % 2 === 0 ? "bg-yellow-50" : "bg-[#F4F4F4]"}`}>
      <td className="p-1">{order._id}</td>

      <td className="p-1 flex items-center gap-2">
        <img
          src={productImage}
          alt="Product"
          className="w-14 h-14 object-cover rounded-lg"
        />
        <div>
          <p className="p-1">{order.orderItems[0]?.name}</p>
          <p className="text-gray-500 text-sm">
            {order.orderItems.length} items
          </p>
        </div>
      </td>

      <td className="p-1">
        <p className="font-semibold">{order.student?.name}</p>
        <p className="text-gray-500 text-sm">{order.address?.emailId}</p>
      </td>

      <td className="p-1">₹{order.totalAmount}</td>

      <td className="p-1">
        <select
          value={order.orderStatus}
          onChange={handleStatusSelect}
          className={`text-sm px-2 py-1 rounded-full outline-none ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"}`}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>

      <td className="p-1">{new Date(order.createdAt).toLocaleDateString()}</td>

      <td className="p-1">
        <button
          onClick={handleViewDetails}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          <img src={PrimaryIcon} alt="Details" className="w-10 h-10" />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
