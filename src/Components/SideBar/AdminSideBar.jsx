import { NavLink, useLocation, useNavigate } from "react-router-dom";
import edukart from "../Images/Edukart.png";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://e-commerce-backend-phi-five.vercel.app/api/admin/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Logout response:", data);

      if (response.ok) {
        console.log("Logout successful");
        localStorage.removeItem("adminAuthToken");
        navigate("/Adminlogin");
      } else {
        console.error("Logout failed", data);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="lg:flex lg:flex-row">
      <div className="bg-yellow-500 text-black lg:h-screen w-full lg:w-[18rem] flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="flex items-center p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md">
              <img src={edukart} alt="Edukart Logo" />
            </div>
            <span className="text-2xl font-bold text-[#3E3A37]">
              Edu<span className="text-blue-700">Kart</span>
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4">
          <ul className="space-y-4 px-4">
            <li
              className={`px-6 py-2 rounded-md cursor-pointer ${
                location.pathname === "/AdminDashboard" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              <NavLink to="/AdminDashboard">Dashboard</NavLink>
            </li>
            <li
              className={`px-6 py-2 rounded-md cursor-pointer ${
                location.pathname === "/PendingSchool" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              <NavLink to="/PendingSchool">Pending Schools</NavLink>
            </li>
            <li
              className={`px-6 py-2 rounded-md cursor-pointer ${
                location.pathname === "/ManageOrder" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              <NavLink to="/ManageOrder">Manage Orders</NavLink>
            </li>
            <li
              className={`px-6 py-2 rounded-md cursor-pointer ${
                location.pathname === "/RegisterSchool" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              <NavLink to="/RegisterSchool">Registered Schools</NavLink>
            </li>
            <li
              className={`px-6 py-2 rounded-md cursor-pointer ${
                location.pathname === "/RegisterStudent" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              <NavLink to="/RegisterStudent">Registered Students</NavLink>
            </li>
            <li
              className={`px-6 py-2 rounded-md cursor-pointer ${
                location.pathname === "/RegisterAdmin" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              <NavLink to="/RegisterAdmin">Registered Admins</NavLink>
            </li>
            <li
              className={`px-6 py-2 rounded-md cursor-pointer ${
                location.pathname === "/AdminAccountDetail" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              <NavLink to="/AdminAccountDetail">Account Detail</NavLink>
            </li>

            <li
              className={`px-6 py-2 rounded-md cursor-pointer ${
                location.pathname === "/AdminRegister" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              <NavLink to="/AdminRegister">Register an Admin</NavLink>
            </li>

            {/* Logout Button */}
            <li
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 text-center"
            >
              Logout
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
