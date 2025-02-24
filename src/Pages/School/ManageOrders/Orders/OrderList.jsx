import React, { useState } from "react";
import OrderRow from "./OrderRow";
import searchIcon from "../../../../Components/Images/SearchOutline.png";
import resetIcon from "../../../../Components/Images/ReplayIcon.png";
import Prev from "../../../../Components/Images/PrevArrow.png";
import Next from "../../../../Components/Images/NextArrow.png";

const orders = [
  {
    id: "#302012",
    product: "Blue Uniform Regular",
    items: "+03 items",
    customer: { name: "John Bushmill", email: "Johnb@mail.com" },
    total: "₹ 700",
    status: "Delivered",
    date: "29 Dec'24",
  },
  {
    id: "#302013",
    product: "Red Uniform Regular",
    items: "+02 items",
    customer: { name: "Alice Green", email: "aliceg@mail.com" },
    total: "₹ 500",
    status: "Processing",
    date: "30 Dec'24",
  },
  {
    id: "#302014",
    product: "Yellow Uniform Regular",
    items: "+04 items",
    customer: { name: "Michael Scott", email: "michaels@mail.com" },
    total: "₹ 800",
    status: "Cancelled",
    date: "31 Dec'24",
  },
  {
    id: "#302015",
    product: "Green Uniform Regular",
    items: "+01 items",
    customer: { name: "Emily White", email: "emilyw@mail.com" },
    total: "₹ 450",
    status: "Processing",
    date: "1 Jan'25",
  },
  {
    id: "#302015",
    product: "Green Uniform Regular",
    items: "+01 items",
    customer: { name: "Emily White", email: "emilyw@mail.com" },
    total: "₹ 450",
    status: "Processing",
    date: "1 Jan'25",
  },
];

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.product.toLowerCase().includes(term) ||
          order.customer.name.toLowerCase().includes(term)
      )
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="mx-auto bg-[#ECECEC] p-4">
      <div className="p-3 md:p-7 bg-white rounded-lg shadow-md">
        
        <div className="bg-peach-custom p-4  flex flex-col md:flex-row justify-between items-center shadow-md  gap-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search orders..."
              className="border p-3 rounded w-full bg-white pl-10 focus:ring focus:ring-blue-200"
            />
            <img src={searchIcon} alt="Search" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
          </div>

          <div className="flex flex-wrap gap-10 justify-center">
            <select className="border p-2 rounded bg-white">
              <option>Color: Red</option>
            </select>
            <select className="border p-2 rounded bg-white">
              <option>Sort by: Latest</option>
            </select>
            <select className="border p-2 rounded bg-white">
              <option>Order Type: All</option>
            </select>
            <button onClick={resetFilters} className="flex items-center text-grey-600 underline">
              <img src={resetIcon} alt="Reset" className="w-6 h-6 mr-2" />
              Reset Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-peach-custom p-2  text-center">
          <div>
            <p className="text-[20px] sm:text-[28px] font-bold">₹ 126.50k</p>
            <p className="text-sm sm:text-base">Total Orders</p>
          </div>
          <div>
            <p className="text-[20px] sm:text-[28px] font-bold">10</p>
            <p className="text-sm sm:text-base">Complete Orders</p>
          </div>
          <div>
            <p className="text-[20px] sm:text-[28px] font-bold">10</p>
            <p className="text-sm sm:text-base">In Process</p>
          </div>
          <div>
            <p className="text-[20px] sm:text-[28px] font-bold">10</p>
            <p className="text-sm sm:text-base">Return/Cancel Orders</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="mt-2 bg-white rounded-lg overflow-x-auto">
          <table className="w-full border-spacing-y-3 border-separate min-w-max">
            <thead className="bg-[#F4F4F4]">
              <tr className="text-left">
                <th className="p-2 text-sm sm:text-base">Order ID</th>
                <th className="p-2 text-sm sm:text-base">Product Detail</th>
                <th className="p-2 text-sm sm:text-base">Customer</th>
                <th className="p-2 text-sm sm:text-base">Total</th>
                <th className="p-2 text-sm sm:text-base">Status</th>
                <th className="p-2 text-sm sm:text-base">Date</th>
                <th className="p-2 text-sm sm:text-base">Detail</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order, index) => (
                  <OrderRow key={index} order={order} index={index} />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4 gap-6">
          <button
            className="flex items-center text-grey-500 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <img src={Prev} alt="Previous" className="w-6 h-6 mr-2" />
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            className="flex items-center text-grey-500 disabled:opacity-50"
            disabled={indexOfLastOrder >= filteredOrders.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
            <img src={Next} alt="Next" className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
