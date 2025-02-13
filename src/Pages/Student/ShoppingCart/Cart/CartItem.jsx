import React from "react";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ product, onQuantityChange, onRemove }) => {
  return (
    <div className="bg-white shadow-md p-5 rounded-lg border border-gray-300 w-full">
      
      {/* Flexbox for Desktop | Column Layout for Mobile */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        
        
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full sm:w-[180px] h-[180px] object-cover rounded-md border" 
        />
        
       
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-semibold text-lg text-black">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.school}</p>

          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-3">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-gray-600">Qty:</span>
              <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
                <button
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                  onClick={() => onQuantityChange(product.id, product.qty - 1)}
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-700">{product.qty}</span>
                <button
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                  onClick={() => onQuantityChange(product.id, product.qty + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <span className="text-gray-600">Size: {product.size}</span>
          </div>

          
          <p className="text-xl text-blue-600 font-bold mt-3">₹ {product.price}</p>
          <p className="text-sm text-gray-600">
            Estimated delivery: <span className="font-bold">25th October 2023</span>
          </p>
          <p className="text-sm text-blue-500 flex items-center justify-center sm:justify-start">
            🔄 14 Days Return Available
          </p>
        </div>
      </div>

      
      <div className="flex justify-center sm:justify-end mt-2">
        <FaTrash
          className="text-red-500 cursor-pointer text-xl hover:text-red-700"
          onClick={() => onRemove(product.id)}
        />
      </div>
      
    </div>
  );
};

export default CartItem;
