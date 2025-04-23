import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderSuccessful() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const latestOrderId = localStorage.getItem("latestOrderId"); // Retrieve the latest order ID

        if (!authToken) throw new Error("Unauthorized. Please login again.");
        if (!latestOrderId) throw new Error("No recent orders found.");

        // Fetch details of the latest order using its ID
        const response = await axios.get(`https://e-commerce-backend-phi-five.vercel.app/api/order/${latestOrderId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setOrderId(response.data._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-[350px]">
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-green-500">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold text-blue-600 mt-4">Thank you!</h2>
        <p className="text-gray-700 mt-2">Order Placed Successfully</p>

        {loading ? (
          <p className="text-gray-500 mt-2">Fetching Order ID...</p>
        ) : error ? (
          <p className="text-red-500 mt-2">{error}</p>
        ) : (
          <p className="text-gray-700 mt-2">
            <span className="font-semibold text-blue-500">Order ID:</span> {orderId}
          </p>
        )}

        <button
          onClick={() => navigate("/StudentMainLandingPage")}
          className="mt-4 bg-[#FF902A] text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccessful;
