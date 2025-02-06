
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import AdminDashboard from './Components/User Management/Admin/AdminDashboard';
import OtpVerification from './Components/User Management/Users/OtpVerification';
import SchoolDashboard from './Components/User Management/School/SchoolDashboard';
import UserRegister from './Components/User Management/Users/UserRegister';
import Userlogin from './Components/User Management/Users/Userlogin'
import EmailResetPage from './Components/User Management/Users/EmailResetPage';
import EmailOtpPage from './Components/User Management/Users/EmailOtpPage';
import ChangePasswordPage from './Components/User Management/Users/ChangePasswordPage';
import MainLandingPage from './Pages/Student/StudentLandingPage/MainLandingPage';
import Product from './Pages/Student/ProductPages/Product';
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
    <Route path='/MainLandingPage' element={<MainLandingPage/>} />
    <Route path='/Product' element={<Product />} />
    </Routes>
    </BrowserRouter>
      <div className='mt-10'>
        <h1 className='flex justify-center items-center'>Student E-commerce application</h1>
      </div>
    </>
  )
}

export default App
