import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // To get screen size dynamically
import hard from "../../Components/Images/none.png";
import uniform from "../../Components/Images/uniform 1.png";
import Book from "../../Components/Images/book-img.png";
import Line from "../../Components/Images/line 1.png";
import book from "../../Components/Images/book.png";
import cartIcon from "../../Components/Images/Cart icon.png";
import uniformImg from "../../Components/Images/Rectangle 420 (1).png";
import bookImg from "../../Components/Images/Rectangle 420 (2).png";
import uniformRedImg from "../../Components/Images/Rectangle 420.png";
import BoxImg from "../../Components/Images/Box Vector.png";
import BuildingImg from "../../Components/Images/Building Vector.png";
import Profile from "../../Components/Images/profile.png";
import CartImg from "../../Components/Images/streamline_shopping-cart-check.png";
import group from '../../Components/Images/educartlogo.png';
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';


function HomeLandingPage() {
  const [fireworks, setFireworks] = useState(false);
  const { width, height } = useWindowSize(); // Get screen dimensions

  const handleFireworks = () => {
    setFireworks(true);
    setTimeout(() => setFireworks(false), 4000); // Stop animation after 2 seconds
  };

  const categories = [
    { name: "Uniform", image: uniform },
    { name: "Books", image: Book },
    { name: "Stationary", image: Line },
  ];

  const productsData = [
    {
      name: "Red School Uniform",
      school: "Sunrise High School",
      price: 850,
      img: uniformRedImg,
    },
    {
      name: "Blue School Uniform",
      school: "Greenwood Academy",
      price: 950,
      img: uniformImg,
    },
    {
      name: "Mathematics Book",
      school: "Sunrise High School",
      price: 450,
      img: bookImg,
    },
    {
      name: "Science Book",
      school: "Greenwood Academy",
      price: 400,
      img: bookImg,
    },
    {
      name: "Yellow School",
      school: "Oakwood School",
      price: 900,
      img: uniformRedImg,
    },
    {
      name: "Black School Uniform",
      school: "Blue Ridge Academy",
      price: 1000,
      img: uniformImg,
    }
  ];

  return (
    <>

      <header className="flex justify-between items-center px-2 py-2 md:px-20 md:py-10 bg-yellow-400 w-full">

        <div className="flex items-center">
          <img src={group} alt="Brand Logo" className="w-10 h-10 md:w-12 md:h-12" />
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 ml-2">
            Edu<span className="text-blue-600">Kart</span>
          </h1>
        </div>

        <div className='bg-black flex justify-center items-center gap-2 p-2 rounded-md cursor-pointer'>
          <img src={Profile} alt="" className="w-6 h-6 md:w-8 md:h-8" />
          <h1 className='text-white'>
            <Link to="/Register">Sign in</Link>
          </h1>
        </div>

      </header>


      {fireworks && <Confetti width={width} height={height} numberOfPieces={300} />}


      <div className="w-full bg-yellow-400 font-sans">
        <div
          className="items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <div className="pr-2 md:mb-14 py-14 md:py-0">
            <h1 className="text-8xl font-bold text-black-900 xl:text-6xl lg:text-6xl md:text-5xl">
              <span className="block w-full text-6xl font-bold">Get School-Ready</span>
              <span className="block w-full text-6xl font-bold">In One Click!</span>
            </h1>
            <p className="py-4 text-[24px] leading-[30px] tracking-[0.2px] font-[400] text-gray-500">
              Shop Books, Uniforms, Stationery & More
            </p>

            <div className="mt-4">
              <div className="flex items-center bg-white rounded-2xl shadow-md w-auto h-15 overflow-hidden border-2 border-yellow-400">
                <input type="text" placeholder="Search something" className="px-4 py-2 w-full focus:outline-none text-gray-700" />
                <button className="px-4 py-2 text-orange-500 text-lg">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>

          <div className="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0 sm:mb-30">
            <img
              id="heroImg1"
              className="transition-all duration-300 ease-in-out lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0 cursor-pointer"
              src={hard}
              alt="Awesome hero page image"
              width="500"
              height="488"
              onClick={handleFireworks} // Trigger fireworks on click
            />
          </div>

        </div>
      </div>


      <section className=' max-padd-container py-16 xl:py-20 w-[95%] m-auto' id='shop'>
        <div className='-mt-30 lg:-mt-40 flex items-start gap-6 flex-wrap justify-center  '>

          {categories.map((item) => (
            <div
              id={item.name}
              key={item.name}
              className={`py-4 lg:py-8 px-6 rounded-3xl flex justify-center text-center gap-4 cursor-pointer bg-[#FFF3CE] w-80 sm:w-70 md:w-80 lg:w-80 transition-all duration-300 shadow-[4px_8px_8px_rgba(255,144,43,0.32)]`}
            >
              <img src={item.image} height={95} width={95} alt='CategoryImg' className="transition-all duration-300" />
              <h4 className='flex justify-center items-center text-3xl font-semibold leading-[24px]'>
                {item.name}
              </h4>
            </div>

          ))}

        </div>
      </section>


      <section className="products relative my-12 w-full mb-32">
        <div className="absolute top-[29%] w-full h-[540px] bg-gray-300 z-0"></div>
        <div className="relative z-10 xl:mx-auto w-[85%] m-auto">

          <h1 className="text-4xl font-semibold w-auto inline-block border-b-4 border-orange-500 pb-2 text-center mb-8 ml-4">
            Explore Products
          </h1>

          <div className="flex flex-wrap justify-center gap-y-20 m-auto">
            {productsData.map((product, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3">

                <div
                  className="h-[430px] max-w-[320px] border-gray-400 flex flex-col justify-between p-4 rounded-lg bg-white shadow-md hover:shadow-[#FF902B] transition-all duration-300 cursor-pointer m-auto">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <hr className="w-full border-gray-300" />
                  <div className="flex justify-between items-center w-full p-2">
                    <div>
                      <span className="text-xl sm:text-[20px] font-semibold">{product.name}</span> <br />
                      <span className="text-base sm:text-[15px] text-gray-600">{product.school}</span> <br />
                      <span className="text-xl sm:text-[18px] font-bold">₹ {product.price}</span>
                    </div>
                    <div className="flex justify-center items-center h-10 w-10 sm:h-12 sm:w-12 bg-[#FF902B] rounded-full cursor-pointer">
                      <img src={cartIcon} alt="Cart Icon" className="text-xl sm:text-[20px] text-white" />
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      <div className="bg-[#FFF3CE] flex items-center justify-center p-4 rounded-md py-8 w-[90%] m-auto mb-22">
        <div className="max-w-5xl w-full">

          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Register your School today !
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 p-3 rounded-full">
                  <img src={BuildingImg} className="w-18 h-18" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Register your School</h3>
                <p className="text-gray-600 text-sm">
                  Enter school details and get verified
                </p>
              </div>

              <div className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 p-3 rounded-full">
                  <img src={BoxImg} className="w-18 h-18" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Products</h3>
                <p className="text-gray-600 text-sm">
                  Add product descriptions, and stock details
                </p>
              </div>

              <div className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 p-3 rounded-full">
                  <img src={CartImg} className="w-18 h-18" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Enjoy Seamless Sale</h3>
                <p className="text-gray-600 text-sm">
                  Analyze sales and optimize inventory
                </p>
              </div>
            </div>

            <button className="bg-[#FF902A] text-white font-semibold py-3 px-12 cursor-pointer rounded-md transition-colors">
              <Link to="/Register">Register Now !</Link>
            </button>
          </div>

        </div>
      </div>


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
            <ul className="space-y-3 mt-5">
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

    </>
  )
}

export default HomeLandingPage

