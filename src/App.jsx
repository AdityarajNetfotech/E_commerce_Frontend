
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import AdminDashboard from './Components/User Management/Admin/AdminDashboard';
import SchoolDashboard from './Components/User Management/School/SchoolDashboard';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/AdminDashboard' element={<AdminDashboard />} />
    <Route path='/SchoolDashboard' element={<SchoolDashboard/>} />
    </Routes>
    </BrowserRouter>
      <div className='mt-10'>
        <h1 className='flex justify-center items-center'>Hard project</h1>
      </div>
    </>
  )
}

export default App
