import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-md p-5 rounded-lg border border-gray-300 w-full">
      
      
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        
        
        <img 
          src={order.image} 
          alt={order.name} 
          className="w-full sm:w-[180px] h-[180px] object-cover rounded-md border" 
        />
        
     
        <div className="flex-1 text-center sm:text-left">
          <p className={`text-[15px] font-medium ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"}`}>
            {order.status} {order.status === "Delivered" ? "on" : "arriving on"} {order.date}
          </p>

          <h3 className="font-bold text-[20px] pt-2">{order.name}</h3>
          <p className="text-[15px] text-gray-600 pt-1">Order ID: {order.id}</p>
          <p className="text-[15px] text-gray-600 pt-1">Qty: {order.qty} | Size: {order.size}</p>
          <p className="text-[15px] text-blue-600 underline cursor-pointer pt-1">
            Exchange/Return available till {order.returnDate}
          </p>
        </div>
      </div>

     
      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <button className="bg-[#FEEFC3] px-4 py-2 rounded-lg w-full sm:w-1/2 text-gray-700 shadow">
          Exchange
        </button>
        <button className="bg-[#FEEFC3] px-4 py-2 rounded-lg w-full sm:w-1/2 text-gray-700 shadow">
          Return
        </button>
      </div>
      
    </div>
  );
};

export default OrderCard;
