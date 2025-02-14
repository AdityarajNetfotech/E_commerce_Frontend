import React from "react";
import OrderCard from "./OrderCard";
import uniform1 from "../../../../components/images/uniform1.png";
import uniform4 from "../../../../components/images/uniform4.png";
import uniform2 from "../../../../components/images/uniform2.png";
import search from "../../../../components/images/search.png";

const orders = [
  {
    id: "123456656",
    name: "Boys Sweater",
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
    qty: 1,
    size: "03",
    returnDate: "20th Sept",
    image: uniform1,
    status: "In Transit",
    date: "15th September",
  },
  {
    id: "123456657",
    name: "Girls Uniform Set ",
    qty: 1,
    size: "03",
    returnDate: "20th Sept",
    image: uniform2,
    status: "In Transit",
    date: "15th September",
  },
];

const OrderList = () => {
  return (
    <div className="w-full lg:w-[750px] bg-white shadow-lg rounded-lg">
      <div className="max-h-[600px] overflow-y-auto p-8 custom-scrollbar space-y-4">
        
    
       <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-[22px] font-bold">All Orders</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-500 px-5 py-2 rounded-lg w-full lg:w-100  focus:outline-none"
          />
         <button className="text-orange-500 text-xl sm:text-2xl md:text-2xl absolute right-3 top-1">
             <img src={search} alt="cart" />
         </button>
        </div>
      </div>

      
        {orders.map((order) => (
          <div key={order.id} className="flex justify-between items-center  rounded-lg shadow">
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
