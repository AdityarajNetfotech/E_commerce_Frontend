import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // To get screen size dynamically
import hard from "../Images/none.png";
import uniform from "../Images/uniform 1.png";
import Book from "../Images/book-img.png";
import Line from "../Images/line 1.png";

export default function Hero() {
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

  return (
    <>
      {/* Fireworks Effect */}
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
          </div>

          <div className="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0 sm:mb-30">
            {/* Hero Image with Click Event */}
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
          {/* <ProductList/> */}
        </div>
      </section>
    </>
  );
}
