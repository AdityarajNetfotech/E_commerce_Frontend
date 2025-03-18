import axios from "axios";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ product, updateCartItem, removeFromCart }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [totalPrice, setTotalPrice] = useState(product.price * product.quantity);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setQuantity(newQuantity);
    setTotalPrice(product.price * newQuantity);

    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      // console.log("Cart updated successfully!");

      updateCartItem(productId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data?.message || error.message);
    }
  };

  const handleRemoveItem = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authentication token found!");
        return;
      }
  
      const res = await axios.delete("http://localhost:5000/api/cart/remove", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { productId: product.product._id }
      });
  
      // console.log("Item removed from cart successfully!", res.data);
      
      removeFromCart(product.product._id);
    } catch (error) {
      console.error("Error removing item from cart:", error.response?.data?.message || error.message);
    }
  };
  

  return (
    <div className="bg-white shadow-md p-5 rounded-lg border border-gray-300 w-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Product Image */}
        <img src={product.image} alt={product.name} className="w-full sm:w-[180px] h-[180px] object-cover rounded-md border" />

        {/* Product Details */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-semibold text-lg text-black">{product.name}</h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-3">
            {/* Quantity Selector */}
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-gray-600">Qty:</span>
              <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
                <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200" onClick={() => handleQuantityChange(product.product._id, quantity - 1)}>
                  -
                </button>
                <span className="px-4 py-2 text-gray-700">{quantity}</span>
                <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200" onClick={() => handleQuantityChange(product.product._id, quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            {/* Product Attributes */}
            <span className="text-gray-600">Size: {product.selectedSize}</span>
            <span className="text-gray-600">Color: {product.selectedColor}</span>
            <span className="text-gray-600">Material: {product.selectedMaterial}</span>
          </div>

          {/* Product Price */}
          <p className="text-xl text-blue-600 font-bold mt-3">₹ {totalPrice}</p>

          <p className="text-sm text-gray-600">
            Estimated delivery: <span className="font-bold">25th October 2023</span>
          </p>
          <p className="text-sm text-blue-500 flex items-center justify-center sm:justify-start">
            🔄 14 Days Return Available
          </p>
        </div>
      </div>

      {/* Remove Item Button */}
      <div className="flex justify-center sm:justify-end mt-2">
        <FaTrash
          className="text-red-500 cursor-pointer text-xl hover:text-red-700" 
          onClick={handleRemoveItem}
        />
      </div>
    </div>
  );
};

export default CartItem;