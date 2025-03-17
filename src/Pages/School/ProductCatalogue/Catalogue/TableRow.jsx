import React from "react";
import Dbtn from "../../../../Components/Images/Dltbtn.png";
import Ebtn from "../../../../Components/Images/Editbtn.png";
import UniformModal from "./UniformModal";
import { useState } from "react";

const TableRow = ({ product, index, onDelete }) => {

  const productImage =
    product.image?.length > 0 ? product.image[0] : "/default-image.jpg";

  const getStockStatus = (product) => {
    let stock = 0;
    if (product.uniformDetails) {
      stock = product.uniformDetails.variations.reduce((total, variation) => {
        const subTotal = variation.subVariations.reduce(
          (subSum, subVar) => subSum + (subVar.stockQty || 0), 0
        );
        return total + subTotal;
      }, 0);
    } else {
       stock = product.bookDetails?.stockQty ?? product.stationaryDetails?.stockQty ?? 0;
    }

    
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (stock < 20) return { text: "Few Left", color: "bg-yellow-100 text-yellow-700" };
    return { text: "In Stock", color: "bg-green-100 text-green-700" };
  };
  const { text, color } = getStockStatus(product);

  const getStockQty = (product) => {
    if (product.uniformDetails) {
      return product.uniformDetails.variations.reduce((total, variation) => {
        return total + variation.subVariations.reduce((subTotal, subVar) => subTotal + (subVar.stockQty || 0), 0);
      }, 0);
    }
    return product.bookDetails?.stockQty ?? product.stationaryDetails?.stockQty ?? "0";
  };



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUniform, setSelectedUniform] = useState(null);

 
  const handleOpenModal = (uniformDetails) => {
    if (uniformDetails) {
      console.log("Uniform Details:", uniformDetails);
      setSelectedUniform(uniformDetails);
      setIsModalOpen(true);
    } else {
      alert("No uniform details available!");
    }
  };

 
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUniform(null);
  };

  return (

    <>
      <tr className={`${index % 2 === 0 ? "bg-yellow-50" : "bg-[#F4F4F4]"}`}>

        <td className="py-2 px-4 flex items-center space-x-2 lg:space-x-4 max-w-[200px] truncate">
          <img
            src={productImage}
            alt={product.name || "Product Image"}
            className="w-12 h-12 rounded-lg flex-shrink-0 object-cover"
          />
          <span className="truncate">{product.name || "Unnamed Product"}</span>
        </td>


        <td className="py-2 px-4 max-w-[150px] truncate">
          {product.SKU || "N/A"}
        </td>


        <td className="py-2 px-4 max-w-[150px] truncate">
          {product.category || "Uncategorized"}
        </td>


        <td className="py-2 px-4 max-w-[100px] text-center">
          {product.uniformDetails
            ? getStockQty(product)
            : product.bookDetails?.stockQty ?? product.stationaryDetails?.stockQty ?? "0"}
        </td>


        <td className="py-2 px-4 max-w-[120px] text-center">
          {product.uniformDetails ? (
            <button
              className="bg-[#FFE8D6] text-[#FF971D] px-2 py-1 rounded-md hover:bg-orange-200"
              onClick={() => handleOpenModal(product.uniformDetails)}
            >
              View
            </button>
          ) : (`₹ ${product.bookDetails?.price ?? product.stationaryDetails?.price ?? "0.00"}`)}
        </td>


        <td className="py-2 px-4 max-w-[150px] truncate">
          <span className={`px-2 py-1 rounded-lg ${color}`}>{text}</span>
        </td>


        <td className="py-2 px-4 max-w-[150px] truncate">
          {new Date(product.createdAt).toLocaleDateString() || "Date not available"}
        </td>


        <td className="py-2 px-4 max-w-[150px]">
          <div className="flex space-x-2">
            <button className="text-gray-500">
              <img src={Ebtn} alt="Edit" />
            </button>
            <button className="text-gray-500 " onClick={() => onDelete(product._id)}>
              <img src={Dbtn} alt="Delete" />
            </button>
          </div>
        </td>
      </tr>
      {isModalOpen && (
        <UniformModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          uniformDetails={selectedUniform}
        />
      )}
    </>

  );
};

export default TableRow;





