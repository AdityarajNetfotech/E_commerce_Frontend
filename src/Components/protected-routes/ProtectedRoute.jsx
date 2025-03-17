import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const authToken = localStorage.getItem("authToken");
  const schoolToken = localStorage.getItem("schoolToken");
  const adminAuthToken = localStorage.getItem("adminAuthToken");

  if (role === "student" && !authToken) {
    return <Navigate to="/Userlogin" />;
  }

  if (role === "school" && !schoolToken) {
    return <Navigate to="/SchoolLogin" />;
  }

  if (role === "admin" && !adminAuthToken) {
    return <Navigate to="/Adminlogin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
