import React, { useState } from 'react'
import Footer from '../../../../Components/footer/Footer';
import CustomNavbar from '../../../../Components/Navbar/Navbar';
import Header from '../header/Header';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProdDetailComp from './ProdDetailComp';

function ProductDetail() {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    // Extracting product details from location state
    const product = location.state?.product || {};
    console.log("product detail", product);

    const schoolName = location.state?.schoolName;

    // Extracting product properties
    const {
        image = [],
        name = 'N/A',
        school = 'N/A',
        productDetail = 'N/A',
        description = "NA",
        uniformDetails = {},
        category = 'N/A',
        SKU = 'N/A',
    } = product;

    // Image handling
    const images = image.length > 0 ? image : ["https://via.placeholder.com/150"];
    const [mainImage, setMainImage] = useState(images[0]);

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? null : section);
    };

    const getColorsForMaterial = () => {
        if (!selectedMaterial) return [];
        return product.uniformDetails.variations
            .filter(variation => variation.variationInfo === selectedMaterial)
            .map(variation => variation.secondVariationInfo);
    };

    // Function to get sizes for selected material & color
    const getSizesForMaterialAndColor = () => {
        if (!selectedMaterial || !selectedColor) return [];
        return product.uniformDetails.variations
            .filter(variation => variation.variationInfo === selectedMaterial && variation.secondVariationInfo === selectedColor)
            .flatMap(variation => variation.subVariations);
    };

    // Function to get price for selected size
    const getPriceForSize = () => {
        if (!selectedMaterial || !selectedColor || !selectedSize) return null;
        const selectedVariation = product.uniformDetails.variations.find(
            variation =>
                variation.variationInfo === selectedMaterial &&
                variation.secondVariationInfo === selectedColor
        );

        if (selectedVariation) {
            const sizeInfo = selectedVariation.subVariations.find(size => size.subVariationType === selectedSize);
            return sizeInfo ? sizeInfo.price : null;
        }
        return null;
    };

    // console.log("Variations path 1:", product.variations);
    // console.log("Variations path 2:", product.uniformDetails?.variations);

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
                            <img src={mainImage} alt="Main Display" className="w-full h-[400px] object-contain border border-gray-300" />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold mb-3">{name || "NA"}</h1>
                        <p className="text-gray-600 mb-2">{schoolName || "NA"}</p>
                        <hr />
                        <p className="text-sm text-gray-500 mt-2">
                            {description || "NA"}
                        </p>

                        <div className='my-8 space-y-4'>
                            {/* Material Selection */}
                            <h1 className="text-lg font-semibold">Select Material</h1>
                            <div className='flex flex-wrap gap-3 mt-3'>
                                {product?.uniformDetails?.variations?.length > 0 ? (
                                    product.uniformDetails.variations.map((variation, index) => (
                                        <span
                                            key={index}
                                            className={`px-4 py-2 border rounded-lg cursor-pointer transition-all 
                                                ${selectedMaterial === variation.variationInfo
                                                    ? "bg-blue-500 text-white border-blue-500 shadow-lg"
                                                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"}
                                                `}
                                            onClick={() => {
                                                setSelectedMaterial(variation.variationInfo);
                                                setSelectedColor(null);
                                                setSelectedSize(null);
                                            }}
                                        >
                                            {variation.variationInfo || "Unknown"}
                                        </span>
                                    ))
                                ) : (
                                    <span className='px-4 py-2 border text-gray-500 rounded-lg bg-gray-100'>No materials available</span>
                                )}
                            </div>

                            {/* Color Selection */}
                            {selectedMaterial && (
                                <>
                                    <h1 className="text-lg font-semibold mt-4">Select Color</h1>
                                    <div className='flex flex-wrap gap-3'>
                                        {getColorsForMaterial().length > 0 ? (
                                            getColorsForMaterial().map((color, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    {/* Color Button */}
                                                    <span
                                                        className={`px-4 py-2 border rounded-lg cursor-pointer transition-all`}
                                                        style={{
                                                            backgroundColor: color, 
                                                            color: "#fff",
                                                            border: selectedColor === color ? "2px solid black" : "1px solid gray"
                                                        }}
                                                        onClick={() => {
                                                            setSelectedColor(color);
                                                            setSelectedSize(null);
                                                        }}
                                                    >
                                                        {color}
                                                    </span>

                                                    {/* Size Selection - Right side of Color */}
                                                    {selectedColor === color && (
                                                        <div className='flex flex-wrap gap-2'>
                                                            {getSizesForMaterialAndColor().length > 0 ? (
                                                                getSizesForMaterialAndColor().map((size, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className={`px-4 py-2 border rounded-lg cursor-pointer transition-all 
                                                                            ${selectedSize === size.subVariationType
                                                                                ? "bg-blue-500 text-white border-blue-500 shadow-lg"
                                                                                : "bg-gray-100 hover:bg-gray-200 border-gray-300"}
                                                                            `}
                                                                        onClick={() => setSelectedSize(size.subVariationType)}
                                                                    >
                                                                        {size.subVariationType}
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span className='px-4 py-2 border text-gray-500 rounded-lg bg-gray-100'>No sizes available</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <span className='px-4 py-2 border text-gray-500 rounded-lg bg-gray-100'>No colors available</span>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Price Display */}
                            {selectedSize && (
                                <>
                                    <h1 className="text-lg font-semibold mt-4">Price</h1>
                                    <p className="font-bold text-xl text-green-600">₹ {getPriceForSize() || "N/A"}</p>
                                </>
                            )}
                        </div>





                        {/* Book price display */}
                        {category === "Books" && (
                            <div className="text-2xl font-bold mt-4 mb-4">
                                ₹ {product?.bookDetails?.price || "NA"}
                            </div>
                        )}

                        <div className="flex items-center space-x-4 mt-6 mb-6">
                            <div className="flex items-center space-x-4 h-10 rounded border border-gray-300 px-3">
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="w-full rounded-md bg-orange-500 h-10 text-white font-medium"
                            >
                                ADD TO CART
                            </button>
                        </div>

                        <div className="mt-6">
                            <div className="border-b mt-2">
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
                                        <p className="text-gray-700">{productDetail}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b mt-2">
                                <button
                                    className="w-full text-left py-4 font-bold flex justify-between cursor-pointer"
                                    onClick={() => toggleAccordion('dynamicDetails')}
                                >
                                    <span>{category === "Books" ? "Book Details" : "Uniform Details"}</span>
                                    <span className={`rounded-full border border-blue-500 p-1 inline-flex items-center justify-center transition-transform duration-300 ${openAccordion === 'dynamicDetails' ? 'rotate-180' : ''}`}>
                                        <i className="fa-solid fa-chevron-down text-blue-700"></i>
                                    </span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-800 ease-in-out ${openAccordion === 'dynamicDetails' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pb-3 bg-white">
                                        {category === "Books" ? (
                                            <>
                                                <p><strong>Grade:</strong> {product?.bookDetails?.grade || "Not specified"}</p>
                                                <p><strong>Subject:</strong> {product?.bookDetails?.subject || "Not specified"}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p><strong>Gender:</strong> {uniformDetails?.gender || "Not specified"}</p>
                                                <p><strong>Sub Category:</strong> {uniformDetails?.subCategory || "Not specified"}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ProdDetailComp />

                <Footer />
            </div>
        </>
    )
}

export default ProductDetail