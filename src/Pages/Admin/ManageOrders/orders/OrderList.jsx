import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "./OrderCard";
import searchIcon from "../../../../Components/Images/SearchOutline.png";
import resetIcon from "../../../../Components/Images/ReplayIcon.png";
import Prev from "../../../../Components/Images/PrevArrow.png";
import Next from "../../../../Components/Images/NextArrow.png";

const itemsPerPage = 4;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    color: "",
    sortBy: "",
    orderType: "",
  });


  const token = localStorage.getItem("adminAuthToken");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("https://e-commerce-backend-phi-five.vercel.app/api/order/all-orders", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter(order =>
      order.orderItems.some(item => item.name?.toLowerCase().includes(term))
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };
   
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({ color: "", sortBy: "", orderType: "" });
    setSearchTerm("");
    setFilteredOrders(orders);
  };

  // Apply filters dynamically
  const applyFilters = (appliedFilters) => {
    let updatedOrders = orders;

    // Filter by search term
    if (appliedFilters.searchTerm) {
      updatedOrders = updatedOrders.filter(order =>
        order.orderItems.some(item => item.name?.toLowerCase().includes(appliedFilters.searchTerm))
      );
    }

    // Filter by color
    if (appliedFilters.color) {
      updatedOrders = updatedOrders.filter(order =>
        order.orderItems.some(item => item.color === appliedFilters.color)
      );
    }

    // Filter by order type
    if (appliedFilters.orderType) {
      updatedOrders = updatedOrders.filter(order => order.orderStatus === appliedFilters.orderType);
    }

    // Sort orders
    if (appliedFilters.sortBy === "Latest") {
      updatedOrders = updatedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (appliedFilters.sortBy === "Oldest") {
      updatedOrders = updatedOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredOrders(updatedOrders);
    setCurrentPage(1);
  };

  // Reset search
  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredOrders(orders);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-auto bg-[#ECECEC] p-4">
      <div className="p-5 bg-white rounded-lg shadow-md">

        {/* Loading & Error Handling */}
        {loading && <p className="text-center text-gray-500">Loading orders...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
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

                {/* Color Filter */}
                <div className="border bg-white p-1 rounded">
                <span>Color: </span>
                <select
                  className="p-2 border-0 focus:ring-0 focus:border-transparent outline-none"
                  name="color"
                  value={filters.color}
                  onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="Red">Red</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Blue">Blue</option>
                </select>
              </div>

              {/* Sort By Filter */}
              <div className="border bg-white p-1 rounded">
                <span>Sort By: </span>
                <select className="p-2 border-0 focus:ring-0 focus:border-transparent outline-none"
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                >
                  <option value="">Sort by</option>
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>

              {/* Order Type Filter */}
              <div className="border bg-white p-1 rounded">
                <span>Order Type: </span>
                <select className="p-2 border-0 focus:ring-0 focus:border-transparent outline-none"
                  name="orderType"
                  value={filters.orderType}
                  onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              
              <button onClick={handleResetSearch} className="flex items-center text-gray-600 underline">
                <img src={resetIcon} alt="Reset" className="w-6 h-6 mr-2" />
                Reset Search
              </button>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-peach-custom p-2 text-center">
              <div>
                <p className="text-[20px] sm:text-[28px] font-bold">{filteredOrders.length}</p>
                <p className="text-sm sm:text-base">Total Orders</p>
              </div>
              <div>
                <p className="text-[20px] sm:text-[28px] font-bold">
                  {filteredOrders.filter(order => order.orderStatus === "Delivered").length}
                </p>
                <p className="text-sm sm:text-base">Completed</p>
              </div>
              <div>
                <p className="text-[20px] sm:text-[28px] font-bold">
                  {filteredOrders.filter(order => order.orderStatus === "Processing").length}
                </p>
                <p className="text-sm sm:text-base">Processing</p>
              </div>
              <div>
                <p className="text-[20px] sm:text-[28px] font-bold">
                  {filteredOrders.filter(order => order.orderStatus === "Cancelled").length}
                </p>
                <p className="text-sm sm:text-base">Cancelled</p>
              </div>
            </div>

            {/* Order Table */}
            <div className="mt-4 bg-white rounded-lg overflow-x-auto">
              <table className="w-full border-spacing-y-2 border-separate min-w-max">
                <thead className="bg-[#F4F4F4]">
                  <tr className="text-left">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Product Detail</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">School</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map(order => <OrderCard key={order._id} order={order} />)
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-10">
                        <p className="text-xl text-gray-500 font-medium">⚠️ No orders found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 gap-6">
              <button
                className="flex items-center text-gray-500 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <img src={Prev} alt="Previous" className="w-6 h-6 mr-2" />
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="flex items-center text-gray-500 disabled:opacity-50"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
                <img src={Next} alt="Next" className="w-5 h-5 ml-2" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderList;
