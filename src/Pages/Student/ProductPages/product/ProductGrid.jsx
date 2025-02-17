import React, { useState } from "react";
import ProductCard from "./ProductCard";
import products from "../../../../data";

const itemsPerPage = 9;

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mx-auto mt-30 flex flex-col items-center">
      <div className="w-full max-w-[1200px] px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-1 gap-y-8 justify-center">
          {selectedProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>

      
      <div className="flex justify-center items-center mt-6 py-8 gap-2">
        <button
          className={`px-5 py-4 rounded-full border transition ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-600 hover:bg-blue-100"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          1
        </button>

        <span className="text-lg font-medium text-blue-600">{currentPage}</span>

        <button
          className={`px-5 py-4 rounded-full border transition ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-600 hover:bg-blue-100"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          2
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
