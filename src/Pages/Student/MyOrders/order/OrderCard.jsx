import axios from "axios";
import { useState } from "react";

const OrderCard = ({ order, onCancel }) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [status, setStatus] = useState(order.orderStatus);

  
  const handleCancelOrder = async () => {
    if (status === "Delivered") {
      alert("Delivered orders cannot be cancelled.");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setIsCancelling(true);
      const token = localStorage.getItem("authToken");

      const response = await axios.put(
        `https://e-commerce-backend-phi-five.vercel.app/api/order/cancel/${order._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Order cancelled successfully!");
        setStatus("Cancelled");

        
        if (onCancel) onCancel(order._id);
      } else {
        alert("Failed to cancel order");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Something went wrong while cancelling.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-lg border border-gray-300 w-full flex flex-col sm:flex-row gap-5">
      {/* Images */}
      <div className="flex flex-col space-y-4">
        {order.orderItems.map((item, index) => {
          const productImage =
            Array.isArray(item.image) && item.image.length > 0
              ? item.image[0]
              : item.product?.image?.length > 0
              ? item.product.image[0]
              : "https://via.placeholder.com/150";

          return (
            <div
              key={index}
              className="h-24 w-24 border-2 border-gray-200 cursor-pointer"
            >
              <img
                src={productImage}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Order Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 text-center sm:text-left">
          <p
            className={`inline-block px-3 py-1 text-[15px] font-medium rounded-full ${
              {
                Delivered: "text-green-600",
                Processing: "text-yellow-600",
                Shipped: "text-blue-600",
                Cancelled: "text-red-600",
              }[status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {status} on{" "}
            <span className="text-gray-500 font-normal">
              {new Date(order.createdAt).toDateString()}
            </span>
          </p>
        </div>

        <div className="border-b border-gray-300 my-2"></div>

        <h3 className="text-[18px] font-montserrat">
          {order.orderItems.map((item) => item.name).join(", ")}
        </h3>

        <p className="text-[16px] text-gray-600 mt-2">Order ID: {order._id}</p>

        <p className="text-[16px] text-gray-600 mt-2">
          <span className="text-blue-700 font-bold">₹ {order.totalAmount}</span>{" "}
          | Qty:{" "}
          {order.orderItems.reduce((total, item) => total + item.quantity, 0)}
        </p>

        <p className="text-[15px] text-blue-600 underline cursor-pointer mt-3">
          ↩ Exchange/Return available till{" "}
          {new Date(order.createdAt).toDateString()}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 pt-2 self-end">
        <button className="bg-[#FEEFC3] px-5 py-2 rounded-lg text-gray-700 shadow-md text-[14px] w-48">
          Exchange
        </button>
        <button className="bg-[#FEEFC3] px-5 py-2 rounded-lg text-gray-700 shadow-md text-[14px] w-48">
          Return
        </button>
        <button
          onClick={handleCancelOrder}
          disabled={
            isCancelling || status === "Cancelled" || status === "Delivered"
          }
          className={`${
            status === "Cancelled" || status === "Delivered"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500"
          } px-5 py-2 rounded-lg text-white shadow-md text-[14px] w-48`}
        >
          {isCancelling ? "Cancelling..." : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
