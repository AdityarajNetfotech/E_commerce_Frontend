import AdminSidebar from "../../SideBar/AdminSideBar";
import DashboardHeader from "./DashboardHeader";
import DashboardScreen from "./DashboardScreen";
import Footer from "../../Footer/Footer";
function AdminDashboard() {

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:h-screen min-h-screen">
        <div>
          <AdminSidebar />
        </div>
        <div className=" flex flex-col flex-1 ">

          <DashboardHeader />
          
          <div className="flex-1 overflow-auto">
            <DashboardScreen />
            
          </div>

         
        </div>
      </div>
      <Footer />


     
    </div>
  );
}

export default AdminDashboard;
