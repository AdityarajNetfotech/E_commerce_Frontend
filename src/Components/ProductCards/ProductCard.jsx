import React from "react";
import cartIcon from "../Images/Cart icon.png"; 
import "../ProductCards/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    

    <div className="cards mb-5">
  <div className="card pb-3">
    <img className="card-img-top" src={product.img} alt="Card image" />
    <div className="card-body position-relative">
      <h4 className="card-title">{product.name}</h4>
      <p className="card-text">{product.school}</p>
      <h4 className="card-text text-info ">₹ {product.price}</h4>
           <button className="icon-container">
           <img src={cartIcon} alt="Cart Icon" className="cart-icon" />
           </button>
    </div>
  </div>
   </div>

  

  );
};

export default ProductCard;
