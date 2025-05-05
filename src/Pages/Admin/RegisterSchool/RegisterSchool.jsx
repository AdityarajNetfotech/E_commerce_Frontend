import React from 'react';
import AdminSidebar from "../../../Components/SideBar/AdminSideBar";
import Header from '../PendingSchool/header/Header';
import Footer from "../../../Components/Footer/Footer";
import RegisterSchoolTable from './RegisterSchoolTable';

function RegisterSchool() {
  const RegisterSchool = "Registered Schools";

  return (
    <div className="overflow-x-hidden bg-[#ECECEC]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <div>
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full">
          <Header heading={RegisterSchool} />

          <main className="flex-1 w-full px-2 sm:px-2 lg:px-6">
            {/* Register School Table */}
            <RegisterSchoolTable />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RegisterSchool;
