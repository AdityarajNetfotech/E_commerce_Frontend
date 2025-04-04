import React from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import book from "../../components/images/book.png";

const Footer = () => {
  return (
    <footer className="bg-grey-custom text-white py-8 sm:py-10 ">
      <div className="container mx-auto px-4 sm:px-8 lg:px-30 flex flex-col md:flex-row justify-between items-start gap-8">
    
        <div className="flex flex-col">
          <div className="flex items-center">
            <img src={book} alt="Brand Logo" className="w-12 h-12 mr-3" />
            <h2 className="text-2xl sm:text-3xl font-bold">
              Edu<span className="text-yellow-400">Cart</span>
            </h2>
          </div>

          <h3 className="mt-17 text-xl sm:text-2xl font-semibold">Follow Us :</h3>
          <div className="flex gap-5 mt-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-8 h-8 cursor-pointer hover:text-yellow-400 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-8 h-8 cursor-pointer hover:text-yellow-400 transition duration-300" />
            </a>
            <a href="mailto:info@netfotech.in">
              <FaEnvelope className="w-8 h-8 cursor-pointer hover:text-yellow-400 transition duration-300" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-3xl font-semibold">Categories</h3>
          <ul className="mt-2 space-y-3 mt-5">
            <li className="text-base sm:text-lg hover:text-yellow-400 cursor-pointer transition duration-300">Uniform</li>
            <li className="text-base sm:text-lg hover:text-yellow-400 cursor-pointer transition duration-300">Books</li>
            <li className="text-base sm:text-lg hover:text-yellow-400 cursor-pointer transition duration-300">Stationery</li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-xl sm:text-3xl font-semibold">Contact Us</h3>
          <p className="text-base sm:text-lg mt-4">Phone: <a href="tel:+91844644464" className="hover:text-yellow-400 transition duration-300">+91 844644464</a></p>
          <p className="text-base sm:text-lg mt-4">Email: <a href="mailto:info@netfotech.in" className="hover:text-yellow-400 transition duration-300">info@netfotech.in</a></p>
        </div>
      </div>

     
      <div className="text-center mt-6 text-base sm:text-lg border-t border-gray-600 pt-4">
        <p>Copyright © 2025 by Netfotech Solutions. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;