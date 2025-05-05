import React from 'react';
import AdminSidebar from "../../../Components/SideBar/AdminSideBar";
import Header from '../PendingSchool/header/Header';
import Footer from "../../../Components/Footer/Footer";
import OrderList from './orders/OrderList';

function ManageOrder() {
  const ManageOrder = "Manage Orders";

  return (
    <div className=" bg-[#ECECEC]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <AdminSidebar />

        <div className="flex flex-col flex-1 w-full">
          <Header heading={ManageOrder} />

          <main className="flex-1 w-full px-2 sm:px-2 lg:px-5">
            <OrderList />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageOrder;
