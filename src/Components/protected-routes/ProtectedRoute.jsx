// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role, roles }) => {
  const authToken = localStorage.getItem("authToken");
  const schoolToken = localStorage.getItem("schoolToken");
  const adminAuthToken = localStorage.getItem("adminAuthToken");

  const currentRole = authToken
    ? "student"
    : schoolToken
    ? "school"
    : adminAuthToken
    ? "admin"
    : null;

  const isAuthorized =
    (role && currentRole === role) ||
    (Array.isArray(roles) && roles.includes(currentRole));

  if (!isAuthorized) {
    const redirectPaths = {
      student: "/Userlogin",
      school: "/SchoolLogin",
      admin: "/Adminlogin",
    };

    return <Navigate to={redirectPaths[currentRole] || "/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
