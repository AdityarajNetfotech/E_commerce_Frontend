import React from 'react'
import AdminSidebar from "../../../Components/SideBar/AdminSideBar";
import Header from '../../School/ProductCatalogue/header/Header'
import Footer from "../../../Components/Footer/Footer";
import RegisterSchoolTable from './RegisterSchoolTable';


function RegisterSchool() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row min-h-screen ">
        <div>
          <AdminSidebar />
        </div>
        <div className=" flex flex-col flex-1 ">

          <Header />

          <div className="flex-1 overflow-auto">
            <RegisterSchoolTable/>

          </div>


        </div>
      </div>
      <Footer />

    </div>
  )
}

export default RegisterSchool
