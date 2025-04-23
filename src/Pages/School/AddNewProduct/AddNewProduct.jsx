import React from 'react'
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/Footer/Footer'
import Header from '../Dashboard/header/Header'
import AddProduct from './AddProduct/AddProduct'




function AddNewProduct() {

  const addNewProduct = "Add New Product"
  
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:h-screen min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className=" flex flex-col flex-1 ">

        <Header heading={addNewProduct} />
          
          <div className="flex-1 overflow-auto">
            <AddProduct />
            
          </div>

         
        </div>
      </div>
      <Footer />


     
    </div>
  )
}

export default AddNewProduct

