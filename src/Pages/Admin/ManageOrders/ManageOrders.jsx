import React from 'react'
import AdminSidebar from "../../../Components/SideBar/AdminSideBar";
import Header from '../PendingSchool/header/Header';
import Footer from "../../../Components/Footer/Footer";
import OrderList from './orders/OrderList';


function ManageOrder() {

  const ManageOrder = "Manage Orders"

  return (
    <div>
      <div className="flex flex-col lg:flex-row min-h-screen ">
        <div>
          <AdminSidebar />
        </div>
        <div className=" flex flex-col flex-1 ">

          <Header heading={ManageOrder} />

          <div className="flex-1 overflow-auto">
             <OrderList />

          </div>


        </div>
      </div>
      <Footer />

    </div>
  )
}

export default ManageOrder;
