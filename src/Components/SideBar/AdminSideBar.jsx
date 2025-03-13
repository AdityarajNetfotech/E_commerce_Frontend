import { NavLink, useLocation, useNavigate } from "react-router-dom";
import edukart from "../Images/Edukart.png";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Logout response:", data);

      if (response.ok) {
        console.log("Logout successful");

        // Remove auth token from localStorage
        localStorage.removeItem("adminAuthToken");

        // Redirect to login page
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
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
              Dashboard
            </li>
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
              <NavLink to="/PendingSchool">Pending Schools</NavLink>
            </li>
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
              <NavLink to="/RegisterSchool">Register School</NavLink>
            </li>
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
              <NavLink to="/RegisterStudent">Register Student</NavLink>
            </li>
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
              <NavLink to="/RegisterAdmin">Register Admin</NavLink>
            </li>
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
              <NavLink to="/AdminAccountDetail">Account Detail</NavLink>
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
