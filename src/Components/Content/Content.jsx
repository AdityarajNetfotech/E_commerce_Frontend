import { useState } from "react";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import hard from "../Images/none.png";
import hardh from "../Images/Group.png";
import hardhh from "../Images/Group.png";
import uniform from "../Images/uniform 1.png"
import Book from "../Images/book-img.png"
import Line from "../Images/line 1.png"
// import ProductList from "../ProductList/ProductList"
 
 
export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
 const categories = [
    {
      name: "Uniform",
      image:uniform
    },
    {
      name: "Books",
      image:Book
    },
    {
      name: "Stationary",
      image:Line
    },
  ];
 
  return (
    <>
      <div className="w-full min-h-screen bg-yellow-400 font-sans">
        {/* Navbar */}
        {/* Hero Section */}
        <div
          className="items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 "
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <div className="pr-2 md:mb-14 py-14 md:py-0">
            <h1 className="text-8xl font-bold text-black-900 xl:text-6xl lg:text-6xl md:text-5xl">
              <span className="block w-full text-6xl font-bold">Get School-Ready</span> <span className="block w-full text-6xl font-bold">In One Click!</span> 
            </h1>
            <p className="py-4 text-[24px] leading-[30px] tracking-[0.2px] font-[400] text-gray-500 2xl:py-8 md:py-6 2xl:pr-5 font-montserrat">
  Shop Books, Uniforms, Stationery & More
</p>

            <div className="mt-4">
              <div className="flex items-center bg-white rounded-2xl shadow-md w-110 h-15 overflow-hidden border-2 border-yellow-400">
                <input
                  type="text"
                  placeholder="Search something"
                  className="px-4 py-2 w-full focus:outline-none text-gray-700"
                />
                <button className=" px-4 py-2 text-orange-500 text-lg ">
                  <FaSearch />
                </button>
                {/* <a href="#contact" class="px-5 py-3 text-lg tracking-wider text-white bg-blue-500 rounded-lg md:px-8 hover:bg-blue-600 group"><span>Explore More</span> </a> */}
              </div>
            </div>
          </div>
 
          <div className="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0 sm:mb-30">
            <img
              id="heroImg1"
              className="transition-all duration-300 ease-in-out lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
              src={hard}
              alt="Awesome hero page image"
              width="500"
              height="488"
            />
          </div>
        </div>
      </div>
      <section className=' max-padd-container py-16 xl:py-20 ' id='shop'>
        <div className='-mt-40 flex items-start gap-6 flex-wrap justify-center  '>
            {categories.map((item)=>(
                <div
                id={item.name}
                key={item.name}
                className={`py-9 px-20 rounded-3xl flex justify-center text-center gap-4 cursor-pointer bg-[#FFF3CE] max-w-80 min-w-80 `}
                >
                    <img src={item.image}  alt='CategoryImg' height={95} width={95}/>
                    <h4 className='flex justify-center items-center text-3xl font-semibold leading-[24px]'>{item.name}</h4>
                </div>
            ))}
             {/* <ProductList/> */}
        </div>
    </section>
    </>
  );
}