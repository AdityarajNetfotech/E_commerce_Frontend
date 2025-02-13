import React, { useState } from "react";
import ProductCard from "./ProductCard";
import uniform1 from "../../../../components/images/uniform1.png";
import uniform2 from "../../../../components/images/uniform2.png";
import uniform3 from "../../../../components/images/uniform3.png";
import uniform4 from "../../../../components/images/uniform4.png";

const products = [
  { image: uniform1, name: "Product Name", school: "School Name", price: 700 },
  { image: uniform2, name: "Product Name", school: "School Name", price: 700 },
  { image: uniform3, name: "Product Name", school: "School Name", price: 300 },
  { image: uniform4, name: "Product Name", school: "School Name", price: 500 },
  { image: uniform2, name: "Product Name", school: "School Name", price: 700 },
  { image: uniform3, name: "Product Name", school: "School Name", price: 900 },
  { image: uniform2, name: "Product Name", school: "School Name", price: 700 },
  { image: uniform1, name: "Product Name", school: "School Name", price: 1000 },
  { image: uniform2, name: "Product Name", school: "School Name", price: 700 },
  { image: uniform2, name: "Product Name", school: "School Name", price: 1000 },
  { image: uniform2, name: "Product Name", school: "School Name", price: 700 },
  { image: uniform1, name: "Product Name", school: "School Name", price: 1000 },
  { image: uniform2, name: "Product Name", school: "School Name", price: 700 },
];

const itemsPerPage = 9;

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mx-4 sm:mx-8 mt-70 sm:mt-35 flex flex-col items-center">
    
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {selectedProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>

     
      <div className="flex justify-center items-center mt-8 py-6 gap-2">
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
