import React from 'react'
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/footer/Footer'
import Header from './header/Header'
import TableList from './Catalogue/TableList'



function ProductCatlogue() {

   const productcatalogue = "Product Catalogue"

  return (
    <div>
      <div className="flex flex-col lg:flex-row min-h-screen ">
        <div>
          <Sidebar />
        </div>
        <div className=" flex flex-col flex-1 ">

          <Header heading={productcatalogue} />
          
          <div className="flex-1 overflow-auto">
            <TableList />
            
          </div>

         
        </div>
      </div>
      <Footer />


     
    </div>
  )
}

export default ProductCatlogue

