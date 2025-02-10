import React from "react";
import productsData from "../../data.js";
import ProductCard from "../ProductCards/ProductCard.jsx";
import "../ProductList/ProductList.css";

const ProductList = () => {
    return (
        <section className="products position-relative">
        <div className="grey-background container-fluid z-0  position-absolute"></div>
                  
                 
            <div className="container">
            <div className="heading-container"><h1 className=" custom-media custom-h2 mb-5">Explore Products</h1></div>
                <div className="products-wrapper d-flex flex-wrap justify-content-between">
                    


                    
                            {productsData.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            

                </div>
            </div>
            
        </section>
    );
};

export default ProductList;

