import React from "react";
import cartIcon from "../Images/Cart icon.png";
 
const ProductCard = ({ product }) => {
  return (
    <div className="mb-5">
      <div className="w-[356px] h-auto shadow-lg hover:shadow-orange-400 hover:border-4 hover:border-orange-500 relative bg-white rounded-lg overflow-hidden">
        <img className="border-b border-gray-300 h-[350px] w-full" src={product.img} alt="Card image" />
        <div className="p-4 relative">
          <h4 className="text-lg font-semibold w-[60%]">{product.name}</h4>
          <p className="text-gray-600 w-[60%]">{product.school}</p>
          <h4 className="text-lg font-bold w-[60%] text-[#3B6E2D]-200">₹ {product.price}</h4>
          <button className="absolute bottom-13 right-10">
            <img src={cartIcon} alt="Cart Icon" className="w-12 h-12" />
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default ProductCard;