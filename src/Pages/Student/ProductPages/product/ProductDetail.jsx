import React, { useState } from 'react'
import Footer from '../../../../Components/footer/Footer';
import CustomNavbar from '../../../../Components/Navbar/Navbar';
import Header from '../header/Header';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProdDetailComp from './ProdDetailComp';
import axios from 'axios';

function ProductDetail() {
    const navigate = useNavigate();
    const [openAccordion, setOpenAccordion] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();

    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [warningMessage, setWarningMessage] = useState("");

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

    const isBookOrStationery = category === "Books" || category === "Stationary";

    const images = image.length > 0 ? image : ["https://via.placeholder.com/150"];
    const [mainImage, setMainImage] = useState(images[0]);

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? null : section);
    };

    const getColorsForMaterial = () => {
        if (!selectedMaterial) return [];

        const matchingVariations = product.uniformDetails.variations
            .filter(variation => variation.variationInfo === selectedMaterial);

        return matchingVariations
            .filter(variation => {
                return variation.subVariations.some(subVar => subVar.stockQty > 0);
            })
            .map(variation => variation.secondVariationInfo);
    };

    const getSizesForMaterialAndColor = () => {
        if (!selectedMaterial || !selectedColor) return [];

        const selectedVariation = product.uniformDetails.variations
            .find(variation =>
                variation.variationInfo === selectedMaterial &&
                variation.secondVariationInfo === selectedColor
            );

        if (selectedVariation) {
            return selectedVariation.subVariations.filter(subVar => subVar.stockQty > 0);
        }

        return [];
    };

    const getStockQtyForSize = () => {
        if (!selectedMaterial || !selectedColor || !selectedSize) return null;

        const selectedVariation = product.uniformDetails.variations.find(
            variation =>
                variation.variationInfo === selectedMaterial &&
                variation.secondVariationInfo === selectedColor
        );

        if (selectedVariation) {
            const sizeInfo = selectedVariation.subVariations.find(size => size.subVariationType === selectedSize);
            return sizeInfo ? sizeInfo.stockQty : null;
        }
        return null;
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

    const handleAddToCart = async () => {
        if (!isBookOrStationery && (!selectedSize || !selectedColor || !selectedMaterial)) {
            alert("Please select all product options.");
            return;
        }

        const cartData = {
            productId: product._id,
            quantity: quantity,
            ...(isBookOrStationery ? {} : {
                selectedSize,
                selectedColor,
                selectedMaterial,
            }),
            price: isBookOrStationery ? (product?.bookDetails?.price || product?.stationaryDetails?.price || 0) : getPriceForSize(),
            image: mainImage
        };

        try {
            const response = await axios.post('http://localhost:5000/api/cart/add', cartData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            });
            console.log("Added to Cart:", response.data);
            alert("Product added to cart!");
            // Navigate to Delivery Address Page
            navigate("/ShoppingCart");
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add product to cart.");
        }
    };

    // handling size selection
    const handleSizeChange = (sizeType) => {
        if (quantity > 1) {
            setWarningMessage("Please add to cart your first selected item. To change size, color, or material, decrease product quantity to 1.");
            return;
        }
        setSelectedSize(sizeType);
        setWarningMessage("");
    };

    // handling color selection
    const handleColorChange = (color) => {
        if (quantity > 1) {
            setWarningMessage("Please add to cart your first selected item. To change size, color, or material, decrease product quantity to 1.");
            return;
        }
        setSelectedColor(color);
        setSelectedSize(null);
        setWarningMessage("");
    };

    // handling material selection
    const handleMaterialChange = (material) => {
        if (quantity > 1) {
            setWarningMessage("Please add to cart your first selected item. To change size, color, or material, decrease product quantity to 1.");
            return;
        }
        setSelectedMaterial(material);
        setSelectedColor(null);
        setSelectedSize(null);
        setWarningMessage("");
    };

    // handling quantity change
    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        if (newQuantity === 1) {
            setWarningMessage("");
        }
    };

    const shouldShowStationeryAccordion = !(category === "Stationary");

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
                        {warningMessage && (
                            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-md text-center font-semibold mb-4 flex justify-between items-center">
                                <span>⚠️ {warningMessage}</span>
                                <button onClick={() => setWarningMessage("")} className="text-red-700 font-bold text-lg hover:text-red-900">
                                    ✖
                                </button>
                            </div>
                        )}

                        <h1 className="text-2xl font-semibold mb-3">{name || "NA"}</h1>
                        <p className="text-gray-600 mb-2">{schoolName || "NA"}</p>
                        <hr />
                        <p className="text-sm text-gray-500 mt-2">
                            {description || "NA"}
                        </p>

                        <div className='my-8 space-y-4'>
                            {isBookOrStationery ? (
                                <div className='flex space-x-4'>
                                    <div>
                                        <h1 className="text-lg font-semibold">Price</h1>
                                        <p className="font-bold text-xl text-green-600">
                                            ₹ {product?.bookDetails?.price || product?.stationaryDetails?.price || "N/A"}
                                        </p>
                                    </div>
                                    <div className="h-14 border-l border-gray-500"></div>
                                    <div>
                                        <h1 className="text-lg font-semibold">Stock</h1>
                                        <p className="text-lg">{product?.bookDetails?.stockQty || product?.stationaryDetails?.stockQty || 0} left</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Material Selection */}
                                    <h1 className="text-lg font-semibold">Select Material</h1>
                                    <div className='flex flex-wrap gap-3 mt-3'>
                                        {product?.uniformDetails?.variations?.length > 0 ? (
                                            [...new Set(product.uniformDetails.variations.map(variation => variation.variationInfo))].map((material, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-4 py-2 border rounded-lg cursor-pointer transition-all 
                                                        ${selectedMaterial === material
                                                            ? "bg-blue-500 text-white border-blue-500 shadow-lg"
                                                            : "bg-gray-100 hover:bg-gray-200 border-gray-300"}
                                                        `}
                                                    onClick={() => handleMaterialChange(material)}
                                                >
                                                    {material || "Unknown"}
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
                                                            <span
                                                                className={`px-4 py-2 border rounded-lg cursor-pointer transition-all`}
                                                                style={{
                                                                    backgroundColor: color,
                                                                    color: "#fff",
                                                                    border: selectedColor === color ? "2px solid black" : "1px solid gray"
                                                                }}
                                                                onClick={() => handleColorChange(color)}
                                                            >
                                                                {color}
                                                            </span>

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
                                                                                onClick={() => handleSizeChange(size.subVariationType)}
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

                                    {selectedSize && (
                                        <>
                                            <div className='mt-4 flex space-x-4'>
                                                <div>
                                                    <h1 className="text-lg font-semibold">Price</h1>
                                                    <p className="font-bold text-xl text-green-600">₹ {getPriceForSize() || "N/A"}</p>
                                                </div>
                                                <div className="h-14 border-l border-gray-500"></div>
                                                <div>
                                                    <h1 className="text-lg font-semibold">Stock</h1>
                                                    <p className="text-lg">{getStockQtyForSize() || 0} left</p>
                                                </div>
                                            </div>
                                        </> 
                                    )}
                                </>
                            )}
                        </div>

                        <div className="flex items-center space-x-4 mt-6 mb-6">
                            <div className="flex items-center space-x-4 h-10 rounded border border-gray-300 px-3">
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
                                    +
                                </button>

                            </div>

                            <button className='w-full rounded-md bg-orange-500 h-10 text-white font-medium cursor-pointer'
                                onClick={handleAddToCart}>
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

                            {shouldShowStationeryAccordion && (
                                <div className="border-b mt-2">
                                    <button
                                        className="w-full text-left py-4 font-bold flex justify-between cursor-pointer"
                                        onClick={() => toggleAccordion('dynamicDetails')}
                                    >
                                        <span>{category === "Books" ? "Book Details" : (category === "Stationery" || category === "Stationary") ? "Stationery Details" : "Uniform Details"}</span>
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
                            )}
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