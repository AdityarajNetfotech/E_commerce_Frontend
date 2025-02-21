import React, { useState } from "react";
import OrderCard from "./OrderCard";
import uniform1 from "../../../../components/images/uniform1.png";
import uniform4 from "../../../../components/images/uniform4.png";
import uniform2 from "../../../../components/images/uniform2.png";
import searchIcon from "../../../../components/images/search.png";

const ordersData = [
  {
    id: "123456656",
    name: "Boys Sweater",
    price: "700",
    qty: 1,
    size: "03",
    returnDate: "20th Sept",
    image: uniform4,
    status: "Delivered",
    date: "15th September",
  },
  {
    id: "123456657",
    name: "Girls Uniform Set with Blazer",
    price: "500",
    qty: 1,
    size: "03",
    returnDate: "20th Sept",
    image: uniform1,
    status: "In Transit",
    date: "15th September",
  },
  {
    id: "123456658",
    name: "Girls Uniform Set",
    price: "500",
    qty: 1,
    size: "03",
    returnDate: "20th Sept",
    image: uniform2,
    status: "In Transit",
    date: "15th September",
  },
  {
    id: "123456658",
    name: "Girls Uniform Set",
    price: "500",
    qty: 1,
    size: "03",
    returnDate: "20th Sept",
    image: uniform1,
    status: "In Transit",
    date: "15th September",
  },
  {
    id: "123456658",
    name: "Girls Uniform Set",
    price: "500",
    qty: 1,
    size: "03",
    returnDate: "20th Sept",
    image: uniform4,
    status: "In Transit",
    date: "15th September",
  },
];

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(ordersData);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setFilteredOrders(ordersData);
    } else {
      const filtered = ordersData.filter((order) =>
        order.name.toLowerCase().includes(value)
      );
      setFilteredOrders(filtered);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilteredOrders(ordersData);
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

         
            <div className="flex flex-wrap gap-9">
              <select className="border border-gray-500 bg-white px-3 py-2 rounded-lg focus:outline-none">
                <option>Month: January</option>
                <option>February</option>
                <option>March</option>
              </select>

              <select className="border border-gray-500 bg-white px-3 py-2 rounded-lg focus:outline-none">
                <option>Sort by: Latest</option>
                <option>Oldest</option>
              </select>

              <select className="border border-gray-500 bg-white px-3 py-2 rounded-lg focus:outline-none">
                <option>Order Type: All</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>

         
            <button
              onClick={resetFilters}
              className="text-gray-500 underline text-md"
            >
              Reset Filter
            </button>
          </div>

         
          <div className="flex flex-wrap  mt-4">
            <div className="px-4 py-2 rounded-md text-center">
              <span className="text-[30px] font-bold">01</span> In Process <span className="text-[30px] ">|</span>
            </div>
            <div className="px-4 py-2 rounded-md text-center">
              <span className="text-[30px] font-bold">00</span> Return/Cancel Orders <span className="text-[30px] ">|</span>
            </div>
          </div>
        </div>

        
        <div className="max-h-[600px] overflow-y-auto pr-3 space-y-4 custom-scrollbar">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="mb-4">
                <OrderCard order={order} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
