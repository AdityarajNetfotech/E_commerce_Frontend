import React from "react";
import cartIcon from "../Images/Cart icon.png";

const ProductCard = ({ product }) => {
  return (
    <>

      <div
        className="h-[430px] w-full max-w-[320px] border-gray-400 flex flex-col justify-between m-auto p-4 rounded-lg bg-white shadow-md hover:shadow-[#FF902B] transition-all duration-300">
        <img
          src={product.img}
          alt="ProductImg"
          className="w-full h-full object-contain rounded-lg"
        />
        <hr className="w-full border-gray-300" />
        <div className="flex justify-between items-center w-full p-2">
          <div>
            <span className="text-xl sm:text-[20px] font-semibold">{product.name}</span> <br />
            <span className="text-base sm:text-[15px] text-gray-600">{product.school}</span> <br />
            <span className="text-xl sm:text-[18px] font-bold">₹ {product.price}</span>
          </div>
          <div className="flex justify-center items-center h-10 w-10 sm:h-12 sm:w-12 bg-[#FF902B] rounded-full cursor-pointer">
            <img src={cartIcon} alt="Cart Icon" className=" text-xl sm:text-[20px ] text-white" />
          </div>
        </div>
      </div>
    </>

  );
};

export default ProductCard;