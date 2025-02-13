import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/footer/Footer";
import CartHeader from "./header/CartHeader";
import CartList from "./Cart/CartList";
import OrderSummary from "../../../Components/order-summary/OrderSummary";

const ShoppingCart = () => {
  return (
    <div>
      <Navbar />
      <CartHeader />

      <h1 className="text-2xl lg:text-3xl font-bold text-center mt-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row justify-center items-start p-4 gap-8">
        <CartList />  
        <OrderSummary />
      </div>
      
      <Footer />
    </div>
  );
};

export default ShoppingCart;
