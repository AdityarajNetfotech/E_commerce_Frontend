import React from "react";
//import { FaBox } from "react-icons/fa"; 

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-md p-5 rounded-lg border border-gray-300 w-full flex flex-col sm:flex-row gap-5">
     
      <img
        src={order.image}
        alt={order.name}
        className="w-[120px] h-[140px] sm:w-[140px] sm:h-[150px] object-cover rounded-md border"
      />

      
      <div className="flex-1 flex flex-col">
        
      <div className="flex-1 text-center sm:text-left">
          <p className={`text-[15px] font-medium ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"}`}>
            {order.status} {order.status === "Delivered" ? "on" : "arriving on"} <span className="text-gray-500"> {order.date}</span>
          </p>
        </div>

        <div className="border-b border-gray-300 my-2"></div>

       
        <h3 className=" text-[18px] font-montserrat">{order.name}</h3>
        <p className="text-[16px] text-gray-600 mt-2">Order ID: {order.id}</p>
        <p className="text-[16px] text-gray-600 mt-2">
          <span className="text-blue-700 font-bold">₹ {order.price}</span> | Qty: {order.qty} | Size: {order.size}
        </p>

      
        <p className="text-[15px] text-blue-600 underline cursor-pointer mt-3 ">
          ↩ Exchange/Return available till {order.returnDate}
        </p>
      </div>

     
      <div className="flex flex-col gap-2 pt-2 self-end">
        <button className="bg-[#FEEFC3] px-5 py-2 rounded-lg text-gray-700 shadow-md text-[14px] w-48">
          Exchange
        </button>
        <button className="bg-[#FEEFC3] px-5 py-2 rounded-lg text-gray-700 shadow-md text-[14px] w-48">
          Return
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
