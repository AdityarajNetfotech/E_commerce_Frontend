import React, { useState } from "react";
import search from "../../../../components/images/search.png";

const SearchBar = () => {
  const [filters, setFilters] = useState({
    color: "Red",
    grade: "Fourth",
    gender: "Girl",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({ color: "Red", grade: "Fourth", gender: "Girl" });
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="absolute top-[-50px] flex flex-col md:flex-row sm:flex-row items-center bg-peach-custom shadow-lg p-4 sm:p-5 md:p-5 rounded-xl w-full  max-w-[1420px]  h-auto md:h-[100px]  sm-[50px]">
    
        <div className="flex items-center bg-white px-3 sm:px-6 md:px-4  py-2 rounded-lg w-full sm:w-[400px] md:w-[200px] lg:w-[500px] sm:w-[100px] shadow-md border border-gray-custom relative mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search something"
            className="outline-none w-full text-lg md:text-xl lg:text-3xl text-gray-custom font-[Poppins]"
          />
          <button className="text-orange-500 text-xl sm:text-2xl md:text-2xl absolute right-3">
            <img src={search} alt="cart" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3  sm:gap-6 md:gap-8 md:ml-8 w-full sm:w-auto mt-2 sm:mt-0 md:w-auto">
          <label className="flex items-center bg-white px-4 md:px-8 py-1 rounded-md shadow-md border border-gray-200 w-full md:w-auto">
            <span className="mr-2 text-gray-700 font-[Montserrat] text-base md:text-lg">Color:</span>
            <select
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
              className="border p-1 md:p-2 rounded-md font-semibold text-gray-700 text-base md:text-lg"
            >
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
            </select>
          </label>

          <label className="flex items-center bg-white px-4 md:px-8 py-1 rounded-md shadow-md border border-gray-200 w-full md:w-auto">
            <span className="mr-2 text-gray-700 font-[Montserrat] text-base md:text-lg">Grade:</span>
            <select
              name="grade"
              value={filters.grade}
              onChange={handleFilterChange}
              className="border p-1 md:p-2 rounded-md font-semibold text-gray-700 text-base md:text-lg"
            >
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </select>
          </label>

          <label className="flex items-center bg-white px-4 md:px-8 py-1 rounded-md shadow-md border border-gray-200 w-full md:w-auto">
            <span className="mr-2 text-gray-700 font-[Montserrat] text-base md:text-lg">Gender:</span>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="border p-1 md:p-2 rounded-md font-semibold text-gray-700 text-base md:text-lg"
            >
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
            </select>
          </label>
        </div>

       
        <button
          onClick={resetFilters}
          className="ml-auto text-gray-600 text-base md:text-lg flex items-center hover:text-gray-800 transition duration-200 mt-4 md:mt-0"
        >
          🔄 Reset Filter
        </button>
      </div>
    </div>
  );
};

export default SearchBar;