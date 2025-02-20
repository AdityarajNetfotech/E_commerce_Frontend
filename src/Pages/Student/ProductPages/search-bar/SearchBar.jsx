import React, { useState } from "react";
import search from "../../../../components/images/search.png";

const SearchBar = () => {
  const [filters, setFilters] = useState({
    color: "Red",
    grade: "Fourth",
    gender: "Girl",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({ color: "Red", grade: "Fourth", gender: "Girl" });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="relative w-[95%] m-auto flex justify-center">
      <style>
        {`
          @media (max-width: 1093px) {
            #filter-custom_css{
              flex-direction: column;
              gap: 10px;
            }
          }

          @media (max-width: 768px) {
            #filter-custom_css{
              display: ${isFilterOpen ? "flex" : "none"};
              flex-direction: column;
              margin-top: 10px;
              position: static;
            }
          }

          @media (max-width: 642px) {
            #sort-custom_css{
             width: 240px !important;
            }
          }
        `}
      </style>

      {/* Show Filter Button */}
      {!isFilterOpen && (
        <button
          onClick={toggleFilter}
          className="md:hidden bg-peach-custom text-gray-600 px-4 py-2 rounded-md absolute top-0 right-0 mt-2 mr-2"
        >
          Show Filters
        </button>
      )}

      <div id="filter-custom_css" className="absolute top-[-35px] flex gap-9 justify-between items-center bg-peach-custom shadow-lg p-4 rounded-xl w-full">
        <div id="search-custom_css" className="flex items-center bg-white px-3 py-1.5 rounded-lg sm:w-[400px] md:w-[600px] lg:w-[350px] shadow-md border-gray-custom relative mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search something"
            className="outline-none w-full text-lg text-[18px] text-gray-custom font-[Poppins]"
          />
          <button className="text-orange-500 text-xl text-[18px] absolute right-3">
            <img src={search} alt="cart" />
          </button>
        </div>

        <div id="sort-custom_css" className="flex lg:w-[600px] md:w-[600px] sm:w-[400px] justify-between flex-col md:flex-row gap-2 mt-2 sm:mt-0">
          <label className="flex items-center bg-white px-4 rounded-md shadow-md border border-gray-200">
            <span className="mr-2 text-gray-700 font-[Montserrat] text-[18px]">Color:</span>
            <select
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
              className="border p-1 md:p-2 rounded-md font-semibold text-gray-700 text-[18px] outline-none border-none"
            >
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
            </select>
          </label>

          <label className="flex items-center bg-white px-4 rounded-md shadow-md border border-gray-200">
            <span className="mr-2 text-gray-700 font-[Montserrat] text-[18px]">Grade:</span>
            <select
              name="grade"
              value={filters.grade}
              onChange={handleFilterChange}
              className="border p-1 md:p-2 rounded-md font-semibold text-gray-700 text-[18px] outline-none border-none"
            >
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </select>
          </label>

          <label className="flex items-center bg-white px-4 rounded-md shadow-md border border-gray-200">
            <span className="mr-2 text-gray-700 font-[Montserrat] text-[18px]">Gender:</span>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="border p-1 md:p-2 rounded-md font-semibold text-gray-700 text-[18px] outline-none border-none"
            >
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
            </select>
          </label>
        </div>

        <button
          onClick={resetFilters}
          className="ml-auto text-gray-600 text-base md:text-lg flex items-center hover:text-gray-800 transition duration-200 mt-4 md:mt-0 cursor-pointer"
        >
          🔄 Reset Filter
        </button>
      </div>

      {/* Hide Filter Button (Positioned at bottom-left) */}
      {isFilterOpen && (
        <button
          onClick={toggleFilter}
          className="md:hidden text-gray-600 px-4 py-2 rounded-md absolute bottom-0 left-0 mb-2 ml-2"
        >
          Hide Filters
        </button>
      )}
    </div>
  );
};

export default SearchBar;
