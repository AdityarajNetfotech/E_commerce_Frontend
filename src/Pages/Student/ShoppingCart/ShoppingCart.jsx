import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import CartHeader from "./header/CartHeader";
import CartList from "./Cart/CartList";
import OrderSummary from "../../../Components/order-summary/OrderSummary";

const ShoppingCart = () => {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      // console.log(response.data);

      setCartItem(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const updateCartItem = (productId, newQuantity) => {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar />
      <CartHeader />
      <h1 className="text-2xl lg:text-3xl font-bold text-center mt-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row justify-center items-start p-4 gap-8">
        <CartList productDetail={cartItem} updatedCartItem={updateCartItem} />
        <OrderSummary totalPrice={totalPrice} />
      </div>

      <Footer />
    </div>
  );
};

export default ShoppingCart;
