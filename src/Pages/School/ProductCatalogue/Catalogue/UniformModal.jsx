import React from "react";

const UniformModal = ({ isOpen, onClose, uniformDetails }) => {
  if (!isOpen) return null;

  const variations = uniformDetails.variations || [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-[#F0EBE3] p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto relative">

        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          ✖
        </button>


        <h2 className="text-xl font-semibold mb-4 text-center">Uniform Details</h2>
        <div className="border border-[#FFA62F] rounded-lg p-2">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-[#FF9D3D] text-white">
                <th className="border px-3 py-1">Color</th>
                <th className="border px-3 py-1">Material</th>
                <th className="border px-3 py-1">Size</th>
                <th className="border px-3 py-1">Price</th>
                <th className="border px-3 py-1">Stock</th>
              </tr>
            </thead>
            <tbody>
              {variations.map((variation, index) =>
                variation.subVariations.map((subVar, subIndex) => (
                  <tr key={`${index}-${subIndex}`} className={`${subIndex % 2 === 0 ? "bg-yellow-50" : "bg-orange-100"} border`}>
                    <td className="border border-gray-300 px-3 py-1 ">{variation.variationInfo || "N/A"}</td>
                    <td className="border border-gray-300 px-3 py-1 ">{variation.secondVariationInfo || "N/A"}</td>
                    <td className="border border-gray-300 px-3 py-1 ">{subVar.subVariationType || "N/A"}</td>
                    <td className="border border-gray-300 px-3 py-1 ">₹ {subVar.price || "0"}</td>
                    <td className="border border-gray-300 px-3 py-1 ">{subVar.stockQty || "0"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UniformModal;
