import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/footer/Footer";
import OrderHeader from "./header/OrderHeader";
import SidebarButtons from "../../../Components/button/Button";
import OrderList from "./order/OrderList";

const MyOrder = () => {
  return (
    <div>
      <Navbar />
      <OrderHeader />

      <div className="flex flex-col lg:flex-row justify-center items-start p-15 gap-8">
        <SidebarButtons />  
        <OrderList />
      </div>
      
    <Footer />
    </div>
  

  );
};

 
export default MyOrder;
