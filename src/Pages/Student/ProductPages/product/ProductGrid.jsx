import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useFilter } from "../FilterContext";

const itemsPerPage = 9;

const ProductGrid = () => {
  const { filters } = useFilter();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get("https://e-commerce-backend-phi-five.vercel.app/api/student/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("Product Grid", response.data);

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);




  const filteredData = products.filter((product) => {
    if (product.category === "Uniform" && product.uniformDetails && product.uniformDetails.variations) {
      const allSizesOutOfStock = product.uniformDetails.variations.every(variation => {
        if (!variation.subVariations || !Array.isArray(variation.subVariations)) {
          return true;
        }
        return variation.subVariations.every(subVar => subVar.stockQty <= 0);
      });

      if (allSizesOutOfStock) {
        return false;
      }

    }
    if (product.category === "Books" && product.bookDetails && product.bookDetails.stockQty <= 0) {
      return false;
    }
    if (product.category === "Stationary" && product.stationaryDetails && product.stationaryDetails.stockQty <= 0) {
      return false;
    }

    if (filters.searchTerm) {
      if (!product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
    }

    if (filters.color) {
      if (!product.uniformDetails?.variations) return false;
      return product.uniformDetails.variations.some(
        (variation) =>
          variation.variationInfo === filters.color ||
          variation.secondVariationInfo === filters.color
      );
    }

    if (filters.grade) {
      if (!product.bookDetails || product.bookDetails.grade !== filters.grade) {
        return false;
      }
    }

    if (filters.gender) {
      if (!product.uniformDetails || product.uniformDetails.gender !== filters.gender) {
        return false;
      }
    }

    if (filters.category) {
      if (filters.category === "Uniform" && !product.uniformDetails) return false;
      if (filters.category === "Books" && !product.bookDetails) return false;
      if (filters.category === "Stationary" && !product.stationaryDetails) return false;
    }


    return true;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mx-auto mt-30 flex flex-col items-center">

      <div className="w-full max-w-[1200px] px-4 flex justify-center items-center">
      <tr><td colSpan="100%" className="text-center py-10 text-gray-500">⏳ Loading Orders...</td></tr>
        {selectedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-18 justify-center">
            {selectedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-center text-xl text-gray-500 font-medium">⚠️ Oops! No products 🛒 found.</p>
          </div>
        )}
      </div>


      <div className="flex justify-center items-center mt-6 py-8 gap-4">
        <button
          className={`px-4 py-2 rounded-xl text-md font-semibold border shadow-md transition-all duration-300 
      ${currentPage === 1
              ? "bg-orange-100 text-orange-500 cursor-not-allowed opacity-60"
              : "bg-gradient-to-r from-orange-300 to-yellow-400 text-white hover:shadow-lg hover:scale-105 active:scale-95"
            }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ◀ Prev
        </button>

        <span className="text-xl font-bold text-orange-600 px-4">{currentPage}</span>

        <button
          className={`px-4 py-2 rounded-xl text-md font-semibold border shadow-md transition-all duration-300 
      ${currentPage === totalPages
              ? "bg-orange-100 text-orange-500 cursor-not-allowed opacity-60"
              : "bg-gradient-to-r from-orange-300 to-yellow-400 text-white hover:shadow-lg hover:scale-105 active:scale-95"
            }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>

  );
};

export default ProductGrid;
