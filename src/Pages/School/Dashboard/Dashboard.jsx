import React from 'react'
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/Footer/Footer'
import Header from './header/header'
import DashboardScreen from './DashboardScreen/DashboardScreen'




function Dashboard() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:h-screen min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className=" flex flex-col flex-1 ">

          <Header />
          
          <div className="flex-1 overflow-auto">
            <DashboardScreen />
            
          </div>

         
        </div>
      </div>
      <Footer />


     
    </div>
  )
}

export default Dashboard

