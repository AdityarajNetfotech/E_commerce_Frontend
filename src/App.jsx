
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import AdminDashboard from './Components/User Management/Admin/AdminDashboard';
import OtpVerification from './Components/User Management/Users/OtpVerification';
import SchoolDashboard from './Components/User Management/School/SchoolDashboard';
import UserRegister from './Components/User Management/Users/UserRegister';
import Userlogin from './Components/User Management/Users/Userlogin'
import EmailResetPage from './Components/User Management/Users/EmailResetPage';
import EmailOtpPage from './Components/User Management/Users/EmailOtpPage';
import ChangePasswordPage from './Components/User Management/Users/ChangePasswordPage';
import StudentMainLandingPage from './Pages/Student/StudentLandingPage/MainLandingPage';
import Product from './Pages/Student/ProductPages/Product';
import ShoppingCart from './Pages/Student/ShoppingCart/ShoppingCart';
import MyOrders from './Pages/Student/MyOrders/MyOrders';
import CustomerCare from './Pages/Student/CustomerCare/CustomerCare';
import AccountDetails from './Pages/Student/Account/AccountDetail';
import ProductDetail from './Pages/Student/ProductPages/product/ProductDetail';
import DeliveryAddress from './Pages/Student/ShoppingCart/DeliveryAddress';
import ProductCatlogue from './Pages/School/ProductCatalogue/ProductCatlogue';
import Adminlogin from '../src/Components/User Management/Admin/Adminlogin';
import PendingSchool from './Pages/Admin/PendingSchool/PendingSchool';
import AddNewProduct from './Pages/School/AddNewProduct/AddNewProduct';
import AddUniform from './Pages/School/AddUniform/AddUniform';
import AddStationary from './Pages/School/AddStationary/AddStationary';
import AddBook from './Pages/School/AddBook/AddBook';

// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* Student */}
    <Route path='/AdminDashboard' element={<AdminDashboard />} />
    <Route path='/UserRegister' element={<UserRegister />} />
    <Route path="/otp-verification" element={<OtpVerification />} />
    <Route path='/SchoolDashboard' element={<SchoolDashboard/>} />
    <Route path='/Userlogin' element={<Userlogin/>} />
    <Route path='/EmailResetPage' element={<EmailResetPage/>} />
    <Route path='/EmailOtpPage' element={<EmailOtpPage/>} />
    <Route path='/ChangePasswordPage' element={<ChangePasswordPage/>} />
    <Route path='/StudentMainLandingPage' element={<StudentMainLandingPage/>} />
    <Route path='/Product' element={<Product />} />
    <Route path='/ShoppingCart' element={<ShoppingCart />} />
    <Route path='/MyOrders' element={<MyOrders />} />
    <Route path='/CustomerCare' element={<CustomerCare />} />
    <Route path='/AccountDetail' element={<AccountDetails />} />
    <Route path='/ProductDetail' element={<ProductDetail />} />
    <Route path='/DeliveryAddress' element={<DeliveryAddress />} />
     {/* School */}
     <Route path='/ProdCatalogue' element={<ProductCatlogue />} />
     {/* Admin */}
     <Route path='/Adminlogin' element={<Adminlogin/>} />
     <Route path='/PendingSchool' element={<PendingSchool/>} />
     <Route path='/NewProd' element={<AddNewProduct />} />
     <Route path='/uniform' element={<AddUniform />} />
     <Route path='/books' element={<AddBook />} />
     <Route path='/stationery' element={<AddStationary />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
