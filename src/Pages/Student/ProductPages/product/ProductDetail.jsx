import React, { useState } from 'react'
import Footer from '../../../../Components/footer/Footer';
import CustomNavbar from '../../../../Components/Navbar/Navbar';
import ProductCard from '../../../../Components/ProductCards/ProductCard';
import products from '../../../../data';
import Header from '../header/Header';
import { useLocation } from "react-router-dom";


function ProductDetail() {
    const [selectedSize, setSelectedSize] = useState('32');
    const [quantity, setQuantity] = useState(1);
    const [openAccordion, setOpenAccordion] = useState(null);
    const location = useLocation();

    const {
        img = '',
        name = 'No Name',
        price = 'N/A',
        school = 'Unknown School',
        sizes = [],
        productInfo = '',
        sellerInfo = {}
    } = location.state || {};

    // Console log to check data
    console.log("Product Details:", { img, name, price, school, sizes, productInfo, sellerInfo });



    // const sizes = ['32', '34', '36', '38'];
    const colors = ['maroon', 'navy'];


    const images = [
        "https://5.imimg.com/data5/RB/CD/GE/SELLER-16274515/school-uniform-blazer.jpg",
        "https://tiimg.tistatic.com/fp/1/008/239/full-sleeves-cotton-formal-wear-college-blazer-for-boys-791.jpg",
        "https://5.imimg.com/data5/NN/MK/MY-32264257/plain-school-uniform-blazer-250x250.jpg"
    ];

    const [mainImage, setMainImage] = useState(images[0]);


    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? null : section);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <CustomNavbar />
                <Header />

                <section className="grid grid-cols-1 gap-8 md:grid-cols-2 py-8 px-4">
                    <div className="flex space-x-4">
                        <div className="flex flex-col space-y-14">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`h-24 w-24 border-2 ${mainImage === img ? "border-[#FF902B]" : "border-gray-200"
                                        } cursor-pointer`}
                                    onClick={() => setMainImage(img)}
                                >
                                    <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>

                        <div className="flex-1">
                            <img src={img} alt="Main Display" className="w-full h-[400px] object-contain border border-gray-300" />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold mb-3">{name}</h1>
                        <p className="text-gray-600 mb-2">{school}</p>
                        <hr />
                        <p className="text-sm text-gray-500 mt-2">
                            This set includes a blazer, skirt, white shirt and school brand
                        </p>

                        <div className="text-2xl font-bold mt-2 mb-2">₹ {price}</div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Select Size</label>
                            <div className="flex space-x-2">
                                {sizes.map((size, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSize(size)}
                                        className={`h-10 w-10 rounded border ${selectedSize === size ? 'border-amber-400 bg-amber-50' : 'border-gray-200'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div className="space-y-2 mt-3 mb-3">
                            <label className="text-sm font-medium">Select Color</label>
                            <div className="flex space-x-2">
                                {colors.map((color) => (
                                    <div
                                        key={color}
                                        className={`h-6 w-6 rounded-full border-2 border-white ring-2 ring-gray-200 ${color === 'maroon' ? 'bg-red-900' : 'bg-navy-900'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex items-center space-x-4 h-8 rounded border border-gray-200 px-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="w-full rounded-md bg-orange-500 h-8 text-white">
                                ADD TO CART
                            </button>
                        </div>


                        <div className="mt-6">
                            <div className="border-b">
                                <button
                                    className="w-full text-left py-4 font-bold flex justify-between cursor-pointer"
                                    onClick={() => toggleAccordion('details')}
                                >
                                    <span>Product Details</span>
                                    <span className={`rounded-full border border-blue-500 p-1 inline-flex items-center justify-center transition-transform duration-300 ${openAccordion === 'details' ? 'rotate-180' : ''}`}>
                                        <i className="fa-solid fa-chevron-down text-blue-700"></i>
                                    </span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-800 ease-in-out ${openAccordion === 'details' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pb-3 bg-white">
                                        {typeof productInfo === "string" ? (
                                            <p className="text-gray-700">{productInfo}</p>
                                        ) : (
                                            productInfo?.map((info, index) => <p key={index} className="text-gray-700">{info}</p>)
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Seller Information Accordion */}
                            <div className="border-b mt-2">
                                <button
                                    className="w-full text-left py-4 font-bold flex justify-between cursor-pointer"
                                    onClick={() => toggleAccordion('seller')}
                                >
                                    <span>Seller Information</span>
                                    <span className={`rounded-full border border-blue-500 p-1 inline-flex items-center justify-center transition-transform duration-300 ${openAccordion === 'seller' ? 'rotate-180' : ''}`}>
                                    <i className="fa-solid fa-chevron-down text-blue-700"></i>
                                    </span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-800 ease-in-out ${openAccordion === 'seller' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pb-3 bg-white">
                                        <p><strong>Seller:</strong> {sellerInfo?.name || "Unknown"}</p>
                                        <p><strong>Location:</strong> {sellerInfo?.location || "Not Available"}</p>
                                        <p><strong>Contact:</strong> {sellerInfo?.contact || "Not Provided"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="my-12">
                    <div className="h-[300px] bg-gray-300 transition-all duration-300 peer">
                        <div className="relative z-1000 top-[50px] w-[85%] mx-auto main">
                            <span className="text-3xl sm:text-4xl font-semibold pb-2 border-b-4 border-[#FF902B]">
                                Often Bought Together
                            </span>

                            <div className="flex justify-between mt-7 gap-1.5 card-main">
                                {products.slice(0, 3).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            <style>
                                {`
                                   @media (max-width: 768px) {
                                        .peer {
                                                height: 100%;
                                            }
                                        .main{
                                            position: static;
                                            padding: 20px 0px
                                        }
                                        .card-main{
                                            gap: 10px;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center
                                        }
                                        .main-hidden {
                                            display: none;
                                        }
                                    }
                                `}
                            </style>
                        </div>
                    </div>

                    <div className="h-[300px] bg-white transition-all duration-300 main-hidden"></div>

                </section>

                <Footer />

            </div>
        </>
    )
}

export default ProductDetail
