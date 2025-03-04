import React from "react";
import AdminSidebar from "../../../Components/SideBar/AdminSideBar";
import Header from "../../School/ProductCatalogue/header/Header";
import PrimaryUserForm from "./form/PrimaryUserForm";
import SecondaryUserForm from "./form/SecondaryUserForm";
import Footer from "../../../Components/Footer/Footer";

function AdminAccountDetail() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <div className="flex flex-1">
        
        <AdminSidebar />

        
        <div className="flex flex-col flex-1 bg-[#ECECEC]">
          <Header />

          
          <div className="flex-1 overflow-auto p-6">
            <div className="bg-[#ECECEC] p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <PrimaryUserForm />
                <SecondaryUserForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <Footer />
    </div>
  );
}

export default AdminAccountDetail;
