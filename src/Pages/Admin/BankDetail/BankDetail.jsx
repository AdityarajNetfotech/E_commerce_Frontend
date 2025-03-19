import React from "react";
import AdminSidebar from "../../../Components/SideBar/AdminSideBar";
import Header from "../PendingSchool/header/Header";
import BankAccountForm from "./form/BankAccountForm";
import Footer from "../../../Components/Footer/Footer";

function BankDetail() {

  const BankDetail = "Bank Details"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar + Content Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-72">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 bg-[#ECECEC]">
          <Header heading={BankDetail} />

          {/* Page Content */}
          <div className="flex-1 flex items-center justify-center p-6">
            <BankAccountForm />
          </div>
        </div>
      </div>

      {/* Footer - Now spans full width */}
      <Footer />
    </div>
  );
}

export default BankDetail;
