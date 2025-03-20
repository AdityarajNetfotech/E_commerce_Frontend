import React from 'react'
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/Footer/Footer'
import Header from "../Dashboard/header/header";
import ProductReviewForm from './ProductReviewForm/ProductReviewForm'

function ProductReview() {

    const ProductReview = "Product Review"

    return (
        <>
            <div>
                <div className="flex flex-col lg:flex-row lg:h-screen min-h-screen ">
                    <div>
                        <Sidebar />
                    </div>
                    <div className=" flex flex-col flex-1 ">
                        <Header heading={ProductReview} />
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
