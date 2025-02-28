import React from "react";
import Sidebar from "../../../Components/SideBar/SideBar";
import AccountDetailsForm from "./Form/AccountDetailsForm";
import Footer from "../../../Components/Footer/Footer";
import Header from "../Dashboard/header/header";

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
