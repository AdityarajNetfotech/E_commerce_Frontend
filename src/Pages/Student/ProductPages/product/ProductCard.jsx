import React from "react";
import cart from "../../../../components/images/cart.png";

const ProductCard = ({ image, name, price, school }) => {
  return (
    <div className="flex flex-col items-center p-4 sm:p-6 gap-1 w-full bg-white border-2 border-gray-400 shadow-lg rounded-lg hover:border-orange-500 hover:shadow-xl transition-all duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-[200px] sm:h-[250px] md:h-[320px] object-cover rounded-md"
      />

      <div className="flex flex-col items-start w-full h-auto gap-3 mt-4">
        <div className="w-full h-[1px] bg-gray-500"></div>

        <h3 className="text-black font-montserrat font-medium text-xl sm:text-2xl">
          {name}
        </h3>

        <p className="text-[#635D5A] font-montserrat text-base sm:text-lg">
          {school}
        </p>

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1">
            <span className="text-blue-600 text-xl sm:text-2xl font-semibold">₹</span>
            <span className="text-blue-600 text-xl sm:text-2xl font-semibold">{price}</span>
          </div>

          <button className="flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full transform -translate-y-2 hover:scale-110 transition-all duration-200">
            <img src={cart} alt={name} className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;