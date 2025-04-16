import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import searchIcon from "../../../../components/images/search.png";

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/order/my-orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch orders");
  
      const data = await response.json();
  
      const sortedOrders = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) =>
        order.orderItems.some((item) => item.name.toLowerCase().includes(value))
      );
      setFilteredOrders(filtered);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilteredOrders(orders);
  };

  return (
    <div className="w-full lg:w-[1300px] bg-white shadow-lg rounded-lg">
      <div className="p-6 md:p-8">
        <h2 className="text-[22px] font-bold mb-4">All Orders</h2>
        <div className="border-b border-gray-300 mb-4"></div>

        <div className="bg-peach-custom p-4 rounded-lg shadow-md mb-4">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="relative w-full sm:w-[280px]">
              <input
                type="text"
                placeholder="Search something"
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-500 bg-white px-5 py-2 w-full rounded-lg focus:outline-none"
              />
              <button className="absolute right-3 top-2">
                <img src={searchIcon} alt="Search" className="h-5 w-5" />
              </button>
            </div>

            <button onClick={resetFilters} className="text-gray-500 underline text-md">
              Reset Filter
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredOrders.length > 0 ? (
          <div className="max-h-[600px] overflow-y-auto pr-3 space-y-4 custom-scrollbar">
            {filteredOrders.map((order) => (
              <div key={order._id} className="mb-4">
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
