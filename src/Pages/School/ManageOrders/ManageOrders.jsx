import React from "react";
import Sidebar from "../../../Components/SideBar/SideBar";
import OrderList from "./Orders/OrderList";
import Footer from "../../../Components/Footer/Footer";
import Header from "../Dashboard/header/Header";

function ManageOrders() {

  const manageorders = "Manage Orders"

  return (
    <div>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 ">
          <Header heading={manageorders} />

          <div className="flex-1 overflow-auto ">
            <OrderList />
          </div>
        </div>
      </div>
    <Footer />
    </div>
  );
}

export default ManageOrders;
