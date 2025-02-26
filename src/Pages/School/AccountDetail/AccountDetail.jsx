import React from "react";
import Sidebar from "../../../Components/SideBar/SideBar";
import Header from "../ProductCatalogue/header/Header";
import AccountDetailsForm from "./Form/AccountDetailsForm";
import Footer from "../../../Components/Footer/Footer";

function AccountDetail() {

  const accountdetail = "Account Details"

  return (
    <div>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 ">
          <Header heading={accountdetail} />

           {/* Account Details Form */}
           <div className="flex justify-center items-center">
            <AccountDetailsForm />
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountDetail;
