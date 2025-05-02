import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import ProtectedRoute from "./Components/protected-routes/ProtectedRoute";

import AdminDashboard from "./Components/UserManagement/Admin/AdminDashboard";
import OtpVerification from "./Components/UserManagement/Users/Otpverification";
//import SchoolDashboard from "./Components/User Management/School/SchoolDashboard";
import UserRegister from "./Components/UserManagement/Users/UserRegister";
import Userlogin from "./Components/UserManagement/Users/Userlogin";
import EmailResetPage from "./Components/UserManagement/Users/EmailResetPage";
import EmailOtpPage from "./Components/UserManagement/Users/EmailOtpPage";
import ChangePasswordPage from "./Components/UserManagement/Users/ChangePasswordPage";
import StudentMainLandingPage from "./Pages/Student/StudentLandingPage/MainLandingPage";
import Product from "./Pages/Student/ProductPages/Product";
import ShoppingCart from "./Pages/Student/ShoppingCart/ShoppingCart";
import MyOrders from "./Pages/Student/MyOrders/MyOrders";
import CustomerCare from "./Pages/Student/CustomerCare/CustomerCare";
import AccountDetails from "./Pages/Student/Account/AccountDetail";
import ProductDetail from "./Pages/Student/ProductPages/product/ProductDetail";
import DeliveryAddress from "./Pages/Student/ShoppingCart/DeliveryAddress";
import ProductCatlogue from "./Pages/School/ProductCatalogue/ProductCatlogue";
import Adminlogin from "./Components/UserManagement/Admin/Adminlogin";
import PendingSchool from "./Pages/Admin/PendingSchool/PendingSchool";
import AddNewProduct from "./Pages/School/AddNewProduct/AddNewProduct";
import AddUniform from "./Pages/School/AddUniform/AddUniform";
import AddStationary from "./Pages/School/AddStationary/AddStationary";
import AddBook from "./Pages/School/AddBook/AddBook";
import ProductReview from "./Pages/School/ProductReview/ProductReview";
import AddSubCategory from "./Pages/School/AddNewProduct/AddSubCategory";
import SchoolRegister from "./Components/UserManagement/School/SchoolRegister";
import SchoolLogin from "./Components/UserManagement/School/Schoollogin";
import SchoolEmailResetPage from "./Components/UserManagement/School/SchoolEmailResetPage";
import ManageOrders from "./Pages/School/ManageOrders/ManageOrders";
import SchoolEmailOtpPage from "./Components/UserManagement/School/SchoolEmailOtpPage";
import SchoolChangePassword from "./Components/UserManagement/School/SchoolChangePasswordPage";
import RegisterSchool from "./Pages/Admin/RegisterSchool/RegisterSchool";
import RegisterStudent from "./Pages/Admin/RegisterStudent/RegisterStudent";
import OrderDetails from "./Pages/School/ManageOrders/OrderDetails";
import ManageStudent from "./Pages/School/ManageStudent/ManageStudent";
import AllOrderDetails from './Pages/School/AllOrderDetails/AllOrderDetails';
import Dashboard from './Pages/School/Dashboard/Dashboard';
import AccountDetail from "./Pages/School/AccountDetail/AccountDetail";
import HomeLandingPage from "./Pages/Home/HomeLandingPage";
import HomeSignUp from "./Pages/Home/HomeSignUp";
import AdminAccountDetail from "./Pages/Admin/AccountDetails/AdminAccountDetail";
import BankDetail from "./Pages/Admin/BankDetail/BankDetail";
import OrderSuccessful from "./Components/Notifications/OrderSuccesful";
import OrderFailed from "./Components/Notifications/OrderFailed";
import ReturnRequest from "./Components/Notifications/ReturnRequest";
import ReturnRequestSuccessful from "./Components/Notifications/ReturnRequestSuccesful";
import ExchangeRequest from "./Components/Notifications/ExchangeRequest";
import ExchangeRequestSuccessful from "./Components/Notifications/ExchangeRequestSuccessful";
import AdminRegister from "./Components/UserManagement/Admin/AdminRegister";
import RegisterAdmin from "./Pages/Admin/RegisterAdmin/RegisterAdmin";
import ManageOrder from "./Pages/Admin/ManageOrders/ManageOrders";
import OrderDetail from "./Pages/Admin/ManageOrders/OrderDetail";
// import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<HomeLandingPage />} />
        <Route path="/Register" element={<HomeSignUp />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/Userlogin" element={<Userlogin />} />
        <Route path="/EmailResetPage" element={<EmailResetPage />} />
        <Route path="/EmailOtpPage" element={<EmailOtpPage />} />
        <Route path="/ChangePasswordPage" element={<ChangePasswordPage />} />
        <Route path="/SchoolRegister" element={<SchoolRegister />} />
        <Route path="/SchoolLogin" element={<SchoolLogin />} />
        <Route
            path="/schoolemailresetpage"
            element={<SchoolEmailResetPage />}
          />
           <Route
            path="/schoolemailotppage"
            element={<SchoolEmailOtpPage />}
          />
           <Route
            path="/schoolchangepasswordpage"
            element={<SchoolChangePassword/>}
          />

        <Route path="/Adminlogin" element={<Adminlogin />} />

        {/* Student Protected Routes */}
        <Route element={<ProtectedRoute role="student" />}>
          <Route path="/StudentMainLandingPage" element={<StudentMainLandingPage />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/MyOrders" element={<MyOrders />} />
          <Route path="/CustomerCare" element={<CustomerCare />} />
          <Route path="/AccountDetails" element={<AccountDetails />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/DeliveryAddress" element={<DeliveryAddress />} />
          
           {/* Notifications */}
           <Route path="/OrderSuccessful" element={<OrderSuccessful />} />
          <Route path="/OrderFailed" element={<OrderFailed />} />
          <Route path="/ReturnRequest" element={<ReturnRequest />} />
          <Route path="/ReturnRequestSuccessful" element={<ReturnRequestSuccessful />} />
          <Route path="/ExchangeRequest" element={<ExchangeRequest />} />
          <Route path="/ExchangeRequestSuccessful" element={<ExchangeRequestSuccessful />} />
        </Route>

        {/* School Protected Routes */}
        <Route element={<ProtectedRoute role="school" />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ProdCatalogue" element={<ProductCatlogue />} />
          <Route path="/ManageOrders" element={<ManageOrders />} />
          <Route path="/ProdReview" element={<ProductReview />} />
          <Route path="/OrderDetails" element={<OrderDetails />} />
          <Route path="/AccountDetail" element={<AccountDetail />} />
          <Route path='/ManageStudent' element={<ManageStudent />} />
          <Route path='/AllOrders' element={<AllOrderDetails />} />
          <Route path="/add-product" element={<AddNewProduct />} />
          <Route path="/add-subcategory" element={<AddSubCategory />} />
          <Route path="/uniform" element={<AddUniform />} />
          <Route path="/books" element={<AddBook />} />
          <Route path="/stationery" element={<AddStationary />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/AdminRegister" element={<AdminRegister />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/PendingSchool" element={<PendingSchool />} />
          <Route path="/ManageOrder" element={<ManageOrder />} />
          <Route path="/OrderDetail" element={<OrderDetail />} />
          <Route path="/RegisterSchool" element={<RegisterSchool />} />
          <Route path="/RegisterStudent" element={<RegisterStudent />} />
          <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
          <Route path="/AdminAccountDetail" element={<AdminAccountDetail />} />
          <Route path="/BankDetail" element={<BankDetail />} />
        </Route>
      
        {/* Redirect Unknown Routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;