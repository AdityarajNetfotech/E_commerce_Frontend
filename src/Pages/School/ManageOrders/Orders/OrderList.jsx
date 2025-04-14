import React, { useEffect, useState } from "react";
import OrderRow from "./OrderRow";
import searchIcon from "../../../../Components/Images/SearchOutline.png";
import resetIcon from "../../../../Components/Images/ReplayIcon.png";
import Prev from "../../../../Components/Images/PrevArrow.png";
import Next from "../../../../Components/Images/NextArrow.png";
import axios from 'axios';

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    color: '',
    sortBy: '',
    orderType: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const token = localStorage.getItem("schoolToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/order/school-orders/", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/order/${orderId}/status`, 
        { orderStatus: newStatus }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // Update local order state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status", error);
      alert("Failed to update order status");
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ color: '', sortBy: '', orderType: '' });
  };

  const filteredData = orders
    .filter(order => {
      if (searchTerm) {
        const matchesSearch = order.orderItems.some(item =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (!matchesSearch) return false;
      }

      if (filters.color) {
        const matchesColor = order.orderItems.some(item => item.color === filters.color);
        if (!matchesColor) return false;
      }

      if (filters.orderType && order.orderStatus !== filters.orderType) return false;

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "Latest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (filters.sortBy === "Oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const paginatedOrders = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const completedOrders = filteredData.filter(order => order.orderStatus === "Delivered").length;
  const processingOrders = filteredData.filter(order => order.orderStatus === "Processing").length;
  const cancelledOrders = filteredData.filter(order => order.orderStatus === "Cancelled").length;

  return (
    <div className="mx-auto bg-[#ECECEC] p-4">
      <div className="p-3 md:p-7 bg-white rounded-lg shadow-md">
        {/* Search & Filters */}
        <div className="bg-peach-custom p-4 flex flex-col md:flex-row justify-between items-center shadow-md gap-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search orders..."
              className="border p-3 rounded w-full bg-white pl-10 focus:ring focus:ring-blue-200"
            />
            <img src={searchIcon} alt="Search" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <div className="border bg-white p-1 rounded">
              <span>Color: </span>
              <select name="color" value={filters.color} onChange={handleFilterChange} className="p-2 border-0 outline-none">
                <option value="">All</option>
                <option value="Red">Red</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Blue">Blue</option>
              </select>
            </div>

            <div className="border bg-white p-1 rounded">
              <span>Sort By: </span>
              <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="p-2 border-0 outline-none">
                <option value="">Sort by</option>
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>

            <div className="border bg-white p-1 rounded">
              <span>Order Type: </span>
              <select name="orderType" value={filters.orderType} onChange={handleFilterChange} className="p-2 border-0 outline-none">
                <option value="">All</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button onClick={handleResetFilters} className="flex items-center text-grey-600 underline">
              <img src={resetIcon} alt="Reset" className="w-6 h-6 mr-2" />
              Reset Filter
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-peach-custom p-2 text-center">
          <div><p className="text-[20px] sm:text-[28px] font-bold">{filteredData.length}</p><p>Total Orders</p></div>
          <div><p className="text-[20px] sm:text-[28px] font-bold">{completedOrders}</p><p>Complete Orders</p></div>
          <div><p className="text-[20px] sm:text-[28px] font-bold">{processingOrders}</p><p>In Process</p></div>
          <div><p className="text-[20px] sm:text-[28px] font-bold">{cancelledOrders}</p><p>Cancelled</p></div>
        </div>

        {/* Orders Table */}
        <div className="mt-2 bg-white rounded-lg overflow-x-auto">
          <table className="w-full border-spacing-y-3 border-separate min-w-max">
            <thead className="bg-[#F4F4F4]">
              <tr className="text-left">
                <th className="p-2">Order ID</th>
                <th className="p-2">Product Detail</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Total</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="100%" className="text-center py-10 text-gray-500">⏳ Loading Orders...</td></tr>
              ) : paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, index) => (
                  <OrderRow key={order._id} order={order} index={index} onStatusChange={handleStatusChange} />
                ))
              ) : (
                <tr><td colSpan="100%" className="text-center py-10 text-gray-500">⚠️ Oops! No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 gap-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="flex items-center text-grey-500 disabled:opacity-50"
          >
            <img src={Prev} alt="Previous" className="w-6 h-6 mr-2" /> Prev
          </button>
          <span>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</span>
          <button
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))}
            className="flex items-center text-grey-500 disabled:opacity-50"
          >
            Next <img src={Next} alt="Next" className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
