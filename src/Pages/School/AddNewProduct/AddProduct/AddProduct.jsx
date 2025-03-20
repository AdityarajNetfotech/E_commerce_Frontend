import React from 'react';
import { Link } from 'react-router-dom';
import uniform from "../../../../Components/Images/uniform 1.png"
import book from "../../../../Components/Images/book-img.png"
import line from "../../../../Components/Images/line 1.png"

function AddProduct() {
  return (
    <div className="bg-[#ECECEC] flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-center text-xl font-semibold mb-6">Select Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Link
            to="/uniform"
            className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img
              alt="Uniform icon"
              className="h-16 w-16"
              src={uniform}
            />
            <span className="font-medium">Uniform</span>
          </Link>
          <Link
            to="/books"
            className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img
              alt="Books icon"
              className="h-16 w-16"
              src={book}
            />
            <span className="font-medium">Books</span>
          </Link>
          <Link
            to="/stationery"
            className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img
              alt="Stationery icon"
              className="h-16 w-16"
              src={line}
            />
            <span className="font-medium">Stationery</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;