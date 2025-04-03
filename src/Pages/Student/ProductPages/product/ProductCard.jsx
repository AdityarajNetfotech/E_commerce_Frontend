import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../../../../components/images/cart.png";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [schoolName, setSchoolName] = useState('');

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ProductDetail`, {
      state: { product, schoolName },
    });
  };

  // console.log("card", product);
  const productUniformPrice = product?.uniformDetails?.variations?.[0]?.subVariations?.[0]?.price;
  const productBookPrice = product?.bookDetails?.price;
  const productStationaryPrice = product?.stationaryDetails?.price;

  const finalPrice = productUniformPrice ?? productBookPrice ?? productStationaryPrice ?? 'NA';

  // console.log("Product Price:", finalPrice);


  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/api/student/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchoolName(response.data.school?.name || "No School Name");
      } catch (error) {
        console.error("Error fetching school name:", error);
      }
    };

    fetchStudentProfile();
  }, []);
  return (
    <div
      onClick={handleClick}
      className="h-[430px] w-full max-w-[320px] border-gray-400 flex flex-col justify-between p-3 rounded-lg bg-white shadow-md hover:shadow-[#FF902B] transition-all duration-300 cursor-pointer"
    >
      <div className="w-full h-[250px] overflow-hidden">
        <img
          src={product.image?.[0] || "https://blocks.astratic.com/img/general-img-portrait.png"}
          alt={product.name || "Product Image"}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      <hr className="w-full border-gray-300" />
      <div className="flex justify-between items-center w-full p-2">
        <div>
          <span className="text-xl sm:text-[20px] font-semibold">{product.name || "NA"}</span> <br />
          <span className="text-base sm:text-[15px] text-gray-600">{schoolName}</span> <br />
          <span className="text-xl sm:text-[18px] font-bold">₹ {finalPrice}</span>
        </div>
        <div className="flex justify-center items-center h-10 w-10 sm:h-12 sm:w-12 bg-[#FF902B] rounded-full cursor-pointer">
          <img src={cart} alt="Cart Icon" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
