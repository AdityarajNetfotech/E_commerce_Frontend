import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/footer/Footer";
import Header from "./header/OrderHeader";
import SidebarButtons from "../../../Components/button/Button";
import OrderList from "./order/OrderList";

const MyOrder = () => {
  const myorder = "MyOrder"

  return (
    <div>
      <Navbar />
      <Header heading={myorder} />

      <div className="flex flex-col lg:flex-row justify-center items-start p-15 gap-8">
        <SidebarButtons />
        <OrderList />
      </div>

      <Footer />
    </div>


  );
};


export default MyOrder;
