import React, { useState } from "react";
import search from "../../../../Components/Images/search.png";
import { useFilter } from "../FilterContext";

const SearchBar = () => {

  const { filters, updateFilters } = useFilter();

  const handleSearchChange = (e) => {
    updateFilters({ searchTerm: e.target.value });
  }

  const handleFilterChange = (e) => {
    updateFilters({ [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    updateFilters({ searchTerm: "", color: "", grade: "", gender: "", category: "" });
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="relative w-[95%] m-auto flex justify-center">
      <style>
        {`
          @media (max-width: 1093px) {
            #filter-custom_css {
              flex-direction: column;
              gap: 10px;
            }
          }

          @media (max-width: 768px) {
            #filter-custom_css {
              display: ${isFilterOpen ? "flex" : "none"};
              flex-direction: column;
              margin-top: 10px;
              position: static;
            }
          }

          @media (max-width: 642px) {
            #sort-custom_css {
              width: 240px !important;
            }
          }
        `}
      </style>


      {!isFilterOpen && (
        <button
          onClick={toggleFilter}
          className="md:hidden bg-peach-custom text-gray-600 px-4 py-2 rounded-md absolute top-0 right-0 mt-2 mr-2"
        >
          Show Filters
        </button>
      )}

      <div
        id="filter-custom_css"
        className="absolute top-[-35px] flex justify-between items-start md:items-center gap-6 bg-peach-custom shadow-lg p-4 rounded-xl w-full"
      >

        <div
          id="sort-custom_css"
          className="flex flex-wrap justify-start gap-3 w-full md:w-auto"
        >

          <label className="flex items-center bg-white px-4 rounded-md shadow-md border border-gray-200">
            <span className="mr-2 text-gray-700 font-[Montserrat] text-[18px]">Category:</span>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="border p-1 md:p-2 rounded-md font-semibold text-gray-700 text-[18px] outline-none border-none"
            >
              <option value="">Category</option>
              <option value="Uniform">Uniform</option>
              <option value="Books">Books</option>
              <option value="Stationary">Stationery</option>
            </select>
          </label>


          <label className="flex items-center bg-white px-4 rounded-md shadow-md border border-gray-200">
            <span className="mr-2 text-gray-700 font-[Montserrat] text-[18px]">Color:</span>
            <select
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
              className="border p-1 md:p-2 rounded-md font-semibold text-gray-700 text-[18px] outline-none border-none"
            >
              <option value="">Color</option>
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
              <option value="">Grade</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
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
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </label>
        </div>


        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full md:w-auto">

          <div className="flex items-center bg-white px-3 py-1.5 rounded-lg sm:w-[400px] md:w-[250px] lg:w-[300px] shadow-md border-gray-custom relative">
            <input
              type="text"
              placeholder="Search something"
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="outline-none w-full text-[18px] text-gray-custom font-[Poppins]"
            />
            <button className="absolute right-3">
              <img src={search} alt="search" className="w-4 h-4" />
            </button>
          </div>


          <button
            onClick={resetFilters}
            className="text-gray-600 text-base md:text-lg flex items-center hover:text-gray-800 transition duration-200 cursor-pointer"
          >
            🔄 Reset Filter
          </button>


          {isFilterOpen && (
            <div className="md:hidden mt-2 flex justify-start w-full">
              <button
                onClick={toggleFilter}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition"
              >
                Hide Filters
              </button>
            </div>
          )}


        </div>
      </div>


    </div>
  );
};

export default SearchBar;
