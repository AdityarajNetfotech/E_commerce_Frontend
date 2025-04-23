import React from 'react'
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/Footer/Footer'
import Header from '../Dashboard/header/Header'
import AddProductForm from './AddProductForm/AddProductForm'




function AddBook() {

  const AddBook = "Add Book"

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:h-screen min-h-screen ">
        <div>
          <Sidebar />
        </div>
        <div className=" flex flex-col flex-1 ">

          
        <Header heading={AddBook} />
          
          <div className="flex-1 overflow-auto">
            <AddProductForm />
            
          </div>

         
        </div>
      </div>
      <Footer />


     
    </div>
  )
}

export default AddBook

