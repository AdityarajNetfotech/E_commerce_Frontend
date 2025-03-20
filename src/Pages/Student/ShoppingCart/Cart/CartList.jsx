import React from "react";
import CartItem from './CartItem';
import { useNavigate } from "react-router-dom";

const CartList = ({ productDetail, updatedCartItem }) => {
  const navigate = useNavigate();
  // console.log("cartlist", productDetail);

  const handleNavigate = () => {
    navigate("/DeliveryAddress", { state: productDetail});
  }

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
      <div>
        <button
          className="w-full bg-orange-500 text-white py-3 mt-4 rounded-lg hover:bg-orange-600 transition"
          onClick={handleNavigate}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartList;