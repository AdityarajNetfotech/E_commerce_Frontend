import React from "react";
import { useNavigate } from "react-router-dom";
import cart from "../../../../components/images/cart.png";

const ProductCard = ({ id, img, name, price, school, sizes, productInfo, sellerInfo }) => {
  const navigate = useNavigate();

  // console.log("Product Data:", { id, img, name, price, school, sizes, productInfo, sellerInfo });

  const handleClick = () => {
    navigate(`/ProductDetail`, {
      state: { img, name, price, school, sizes, productInfo, sellerInfo },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="h-[430px] w-full max-w-[320px] border-gray-400 flex flex-col justify-between p-3 rounded-lg bg-white shadow-md hover:shadow-[#FF902B] transition-all duration-300 cursor-pointer"
    >
      <img
        src={img}
        alt={name}
        className="w-full h-full object-contain rounded-lg"
      />
      <hr className="w-full border-gray-300" />
      <div className="flex justify-between items-center w-full p-2">
        <div>
          <span className="text-xl sm:text-[20px] font-semibold">{name}</span> <br />
          <span className="text-base sm:text-[15px] text-gray-600">{school}</span> <br />
          <span className="text-xl sm:text-[18px] font-bold">₹ {price}</span>
        </div>
        <div className="flex justify-center items-center h-10 w-10 sm:h-12 sm:w-12 bg-[#FF902B] rounded-full cursor-pointer">
          <img src={cart} alt="Cart Icon" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
