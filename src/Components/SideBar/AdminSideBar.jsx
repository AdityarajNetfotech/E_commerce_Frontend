import edukart from "../Images/Edukart.png";
import { NavLink, useLocation } from "react-router-dom";
const AdminSidebar = () => {
  const location = useLocation();
  return (
    <div className="lg:flex lg:flex-row ">
      
      <div className="bg-yellow-500 text-black  lg:h-screen w-full lg:w-[18rem] flex-shrink-0 flex flex-col">
       
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
       
        <nav className="mt-4">
          <ul className="space-y-4 px-4">
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
              Dashboard
            </li>
            
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
            <NavLink
                to="/PendingSchool"
              >
                Pending Schools
              </NavLink>
            </li>
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
            <NavLink
                to="/RegisterSchool"
              >
                Register School
              </NavLink>
            </li>
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
            <NavLink
                to="/RegisterStudent"
              >
                Register Student
              </NavLink>
              
            </li>
            <li className="px-6 py-2 hover:bg-black text-white rounded-md cursor-pointer">
              Account Details
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;





