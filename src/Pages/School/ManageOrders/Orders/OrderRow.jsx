import React from "react";
import { useNavigate } from "react-router-dom";
import uniform from "../../../../Components/Images/BlueUniform.png";
import PrimaryIcon from "../../../../Components/Images/PrimaryIcon.png";

const statusColors = {
  Delivered: "bg-green-100 text-green-600",
  Processing: "bg-yellow-100 text-yellow-600",
  Cancelled: "bg-red-100 text-red-600",
};



const OrderRow = ({ order, index }) => {
  const navigate = useNavigate();

  const productImage =
    order.orderItems.length > 0 && order.orderItems[0].image
      ? order.orderItems[0].image
      : "/default-image.jpg";

  const handleViewDetails = () => {
    navigate(`/OrderDetails`, { state: { order } });
    console.log("OrderDetails:", order);
  };

  return (
    <tr className={`border-b ${index % 2 === 0 ? "bg-yellow-50" : "bg-[#F4F4F4]"}`}>
      <td className="p-1">{order._id}</td>
      <td className="p-1 flex items-center gap-2">
        <img src={productImage} alt="Product" className="w-14 h-14 object-cover rounded-lg" />
        <div>
          <p className="p-1">{order.orderItems[0]?.name}</p>
          <p className="text-gray-500 text-sm">{order.orderItems.length} items</p>
        </div>
      </td>
      <td className="p-1">
        <p className="font-semibold">{order.student.name}</p>
        <p className="text-gray-500 text-sm">{order.address.emailId}</p>
      </td>
      <td className="p-1">₹{order.totalAmount}</td>
      <td className="p-1">
        <span className={`px-3 py-1 text-sm rounded-full ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
          {order.orderStatus}
        </span>
      </td>
      <td className="p-1">{new Date(order.createdAt).toLocaleDateString()}</td>
      <td className="p-1">
        <button onClick={handleViewDetails} className="text-gray-600 hover:text-gray-800 transition">
          <img src={PrimaryIcon} alt="Details" className="w-10 h-10" />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
