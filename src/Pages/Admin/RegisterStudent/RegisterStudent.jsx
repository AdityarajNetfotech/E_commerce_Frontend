import AdminSidebar from "../../../Components/SideBar/AdminSideBar";
import Header from "../PendingSchool/header/Header";
import Footer from "../../../Components/Footer/Footer";
import RegisterStudentTable from "./RegisterStudentTable";

function RegisterStudent() {

  const RegisterStudent = "Registered Students"

  return (
    <div>
    <div className="flex flex-col lg:flex-row min-h-screen ">
      <div>
        <AdminSidebar />
      </div>
      <div className=" flex flex-col flex-1 ">

        <Header heading={RegisterStudent}/>

        <div className="flex-1 overflow-auto">
          <RegisterStudentTable/>

        </div>


      </div>
    </div>
    <Footer />

  </div>
  )
}

export default RegisterStudent
