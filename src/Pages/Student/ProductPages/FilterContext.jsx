import { createContext, useContext, useState } from "react";


const FilterContext = createContext();


export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    color: "",
    grade: "",
    gender: "",
  });

  
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};


export const useFilter = () => {
  return useContext(FilterContext);
};
