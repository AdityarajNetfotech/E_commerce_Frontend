import React from 'react';
import Header from './header/Header'; 
import SearchBar from './search-bar/SearchBar';
import ProductGrid from './product/ProductGrid';
import Footer from '../../../Components/Footer/Footer';
import Navbar from '../../../Components/Navbar/Navbar'

function Product() {
  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar />
      <ProductGrid />
      <Footer />
    </div>
  );
}

export default Product;
