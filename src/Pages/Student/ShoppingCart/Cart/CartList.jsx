import React from "react";
import CartItem from './CartItem';

const CartList = ({ productDetail, updatedCartItem }) => {
  console.log("cartlist", productDetail);

  return (
    <div className="w-full lg:w-[1000px] mx-auto bg-white shadow-lg p-6 rounded-lg">
      <div className="max-h-[600px] overflow-y-auto pr-3 space-y-4 custom-scrollbar">
        {productDetail.length > 0 ? (
          productDetail.map((product) => (
            <CartItem key={product.product._id} product={product} updateCartItem={updatedCartItem} />
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default CartList;