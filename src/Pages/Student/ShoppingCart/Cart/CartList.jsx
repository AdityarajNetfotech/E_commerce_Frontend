import React, { useState } from "react";
import CartItem from "./CartItem";
import uniform2 from "../../../../components/images/uniform2.png";
import uniform1 from "../../../../components/images/uniform1.png";
import uniform4 from "../../../../components/images/uniform4.png";

const initialProducts = [
  {
    id: 1,
    name: "Girls Uniform Set with Blazer",
    school: "Gurukul High School, Ahmedabad",
    qty: 1,
    size: "03",
    price: 700,
    image: uniform2,
  },
  {
    id: 2,
    name: "Girls Uniform Set with Blazer",
    school: "Gurukul High School, Ahmedabad",
    qty: 1,
    size: "03",
    price: 700,
    image: uniform1,
  },
  {
    id: 3,
    name: "Girls Uniform Set with Blazer",
    school: "Gurukul High School, Ahmedabad",
    qty: 1,
    size: "03",
    price: 700,
    image: uniform4,
  },
];

const CartList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedItems, setSelectedItems] = useState(initialProducts.map((p) => p.id));

 
  const handleRemoveItem = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    setSelectedItems((prevSelected) => prevSelected.filter((itemId) => itemId !== id));
  };

  
  const handleRemoveSelected = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => !selectedItems.includes(product.id))
    );
    setSelectedItems([]); 
  };


  const handleQuantityChange = (id, qty) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, qty: Math.max(qty, 1) } : product
      )
    );
  };


  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

 
  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === products.length ? [] : products.map((p) => p.id));
  };

  return (
    <div className="w-full lg:w-[1000px] mx-auto bg-white shadow-lg p-6 rounded-lg">
      
     
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedItems.length === products.length && products.length > 0}
            onChange={handleSelectAll}
            className="w-5 h-5 accent-yellow-500 cursor-pointer"
          />
          <span className="font-bold text-lg">
            {selectedItems.length}/{products.length} Items Selected
          </span>
        </div>

        <button
          className="text-blue-700 font-bold hover:text-red-700 disabled:opacity-50"
          onClick={handleRemoveSelected}
          disabled={selectedItems.length === 0}
        >
          Remove Selected
        </button>
      </div>

     
      <div className="max-h-[600px] overflow-y-auto pr-3 space-y-4 custom-scrollbar">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="flex items-center space-x-3">
              
              <input
                type="checkbox"
                checked={selectedItems.includes(product.id)}
                onChange={() => handleSelectItem(product.id)}
                className="w-5 h-5 accent-yellow-500 cursor-pointer"
              />

             
              <CartItem
                product={product}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem} 
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No items in the cart</p>
        )}
      </div>
    </div>
  );
};

export default CartList;
