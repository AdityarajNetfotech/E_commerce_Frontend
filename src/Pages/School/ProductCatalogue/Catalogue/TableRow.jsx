import React from "react";
import uniform from "../../../../Components/Images/BlueUniform.png";
import Dbtn from "../../../../Components/Images/Dltbtn.png";
import Ebtn from "../../../../Components/Images/Editbtn.png";

const TableRow = ({ product, index, onDelete }) => {
  return (
    <tr className={`${index % 2 === 0 ? "bg-yellow-50" : "bg-[#F4F4F4]"}`}>
      <td className="py-2 px-4 flex items-center space-x-2 lg:space-x-4 max-w-[200px] truncate">
        <img
          src={uniform}
          alt={product.name || "Product Image"}
          className="w-12 h-12 rounded-lg flex-shrink-0 object-cover"
        />
        <span className="truncate">{product.name || "Unnamed Product"}</span>
      </td>
      <td className="py-2 px-4 max-w-[150px] truncate">{product.sku || "N/A"}</td>
      <td className="py-2 px-4 max-w-[150px] truncate">{product.category || "Uncategorized"}</td>
      <td className="py-2 px-4 max-w-[100px] text-center">{product.stock ?? "0"}</td>
      <td className="py-2 px-4 max-w-[120px] text-center">₹ {product.price ?? "0.00"}</td>
      <td className="py-2 px-4 max-w-[150px] truncate">
        <span
          className={`px-2 py-1 rounded-lg ${
            product.status === "In Stock"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.status || "Unknown"}
        </span>
      </td>
      <td className="py-2 px-4 max-w-[150px] truncate">{product.added || "Date not available"}</td>
      <td className="py-2 px-4 max-w-[150px]">
        <div className="flex space-x-2">
          <button className="text-gray-500 hover:text-red-600">
            <img src={Ebtn} alt="Edit" />
          </button>
          <button className="text-gray-500 hover:text-gray-800" onClick={() => onDelete(product.id)}>
            <img src={Dbtn} alt="Delete" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;




