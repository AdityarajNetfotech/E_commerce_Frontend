import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({totalPrice}) => {

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/DeliveryAddress");  // Navigates to Delivery Address Page
  };


  const [updatedTotalPrice, setUpdatedTotalPrice] = useState(totalPrice);

  
  

  useEffect(() => {
    setUpdatedTotalPrice(totalPrice);
  }, [totalPrice]);

  return (
    <div className="bg-peach-custom p-5 rounded-lg shadow-lg w-full lg:w-1/3 flex flex-col items-center space-y-4">
    
      <h2 className="text-3xl font-semibold text-black">Order Summary</h2>

     
      <div className="bg-white shadow-md p-5 w-full  rounded-lg">
      
        <div className="space-y-4">
          <div className="flex justify-between text-lg">
            <span className="text-gray-700">Subtotal</span>
            <span className="text-gray-800 font-medium">₹ {updatedTotalPrice}</span>
          </div>

          <div className="flex justify-between text-lg text-red-500">
            <span>Discount (-20%)</span>
            <span>- ₹ 0</span>
          </div>

          <div className="flex justify-between text-lg">
            <span className="text-gray-700">Shipping Charges</span>
            <span className="text-gray-800">₹ 0</span>
          </div>

          <hr className="border-gray-300" />

          <div className="flex justify-between text-xl font-bold text-green-600">
            <span>Total</span>
            <span>₹ {updatedTotalPrice}</span>
          </div>
        </div>

      
        <button className="w-full bg-orange-500 text-white py-3 mt-4 rounded-lg hover:bg-orange-600 transition"
         onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
