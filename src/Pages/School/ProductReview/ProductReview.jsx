import React from 'react'
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/footer/Footer'
import Header from '../AddNewProduct/header/Header'
import ProductReviewForm from './ProductReviewForm/ProductReviewForm'

function ProductReview() {
    return (
        <>
            <div>
                <div className="flex flex-col lg:flex-row lg:h-screen min-h-screen ">
                    <div>
                        <Sidebar />
                    </div>
                    <div className=" flex flex-col flex-1 ">
                        <Header />
                        <div className="flex-1 overflow-auto">
                            <ProductReviewForm />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ProductReview
