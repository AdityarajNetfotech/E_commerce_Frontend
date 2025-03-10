import React from "react";
import Dbtn from "../../../../Components/Images/Dltbtn.png";
import Ebtn from "../../../../Components/Images/Editbtn.png";

const TableRow = ({ product, index, onDelete }) => {

  const productImage =
    product.image?.length > 0 ? product.image[0] : "/default-image.jpg";

    const getStockStatus = (product) => {
      const stock =
        product.uniformDetails?.stockQty ??
        product.bookDetails?.stockQty ??
        product.stationaryDetails?.stockQty ??
        0;
    
      if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-700" };
      if (stock < 20) return { text: "Few Left", color: "bg-yellow-100 text-yellow-700" };
      return { text: "In Stock", color: "bg-green-100 text-green-700" };
    };

    const { text, color } = getStockStatus(product);


  return (
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
        {product.uniformDetails?.stockQty ?? product.bookDetails?.stockQty ?? product.stationaryDetails?.stockQty  ?? "0"}
      </td>


      <td className="py-2 px-4 max-w-[120px] text-center">
        ₹ {product.uniformDetails?.price ?? product.bookDetails?.price ?? product.stationaryDetails?.price ??  "0.00"}
      </td>


      <td className="py-2 px-4 max-w-[150px] truncate">
        <span className={`px-2 py-1 rounded-lg ${color}`}>{text}</span>
      </td>


      <td className="py-2 px-4 max-w-[150px] truncate">
        {new Date(product.createdAt).toLocaleDateString() || "Date not available"}
      </td>


      <td className="py-2 px-4 max-w-[150px]">
        <div className="flex space-x-2">
          <button className="text-gray-500 hover:text-red-600">
            <img src={Ebtn} alt="Edit" />
          </button>
          <button className="text-gray-500 hover:text-gray-800" onClick={() => onDelete(product._id)}>
            <img src={Dbtn} alt="Delete" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;





