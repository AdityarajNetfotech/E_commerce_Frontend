import React, { useEffect, useState } from 'react'
import Footer from '../../../../Components/footer/Footer';
import CustomNavbar from '../../../../Components/Navbar/Navbar';
import Header from '../header/Header';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProdDetailComp from './ProdDetailComp';

function ProductDetail() {
    // Combined state for all variation types
    const [activeVariationType, setActiveVariationType] = useState(null); // "Color" or "Material"
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [availableSizes, setAvailableSizes] = useState([]);
    
    const [openAccordion, setOpenAccordion] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();

    // Extracting product details from location state
    const product = location.state?.product || {};
    const schoolName = location.state?.schoolName;
    // console.log("Product data:", product, schoolName);

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

    // Extract variations from the product
    const variations = product?.uniformDetails?.variations || [];
    
    // Get all color variations
    const colorVariations = variations.filter(v => v.variationType === "Color");
    
    // Get all material variations
    const materialVariations = variations.filter(v => v.variationType === "Material");
    
    // Image handling
    const images = image.length > 0 ? image : ["https://via.placeholder.com/150"];
    const [mainImage, setMainImage] = useState(images[0]);

    // Initialize selected variations on component mount
    useEffect(() => {
        // Set default variation type - prioritize color if available
        if (colorVariations.length > 0) {
            setActiveVariationType("Color");
            
            // Set default color if available
            const firstVariation = colorVariations[0];
            setSelectedVariation(firstVariation);

            // Get sizes for the selected color
            const sizes = firstVariation.subVariations || [];
            setAvailableSizes(sizes);

            // Set default size and price if available
            if (sizes.length > 0) {
                setSelectedSize(sizes[0]);
                setSelectedPrice(sizes[0].price);
            }
        } 
        else if (materialVariations.length > 0) {
            setActiveVariationType("Material");
            
            // Set default material if available
            const firstVariation = materialVariations[0];
            setSelectedVariation(firstVariation);

            // Get sizes for the selected material
            const sizes = firstVariation.subVariations || [];
            setAvailableSizes(sizes);

            // Set default size and price if available
            if (sizes.length > 0) {
                setSelectedSize(sizes[0]);
                setSelectedPrice(sizes[0].price);
            }
        }
    }, [variations]);

    // Handle variation type change (Color or Material)
    const handleVariationTypeChange = (type) => {
        setActiveVariationType(type);
        
        // Reset selection when switching between variation types
        const variationsOfType = type === "Color" ? colorVariations : materialVariations;
        
        if (variationsOfType.length > 0) {
            // Set the first variation of the selected type
            const firstVariation = variationsOfType[0];
            setSelectedVariation(firstVariation);
            
            // Get sizes for the selected variation
            const sizes = firstVariation.subVariations || [];
            setAvailableSizes(sizes);
            
            // Set default size and price if available
            if (sizes.length > 0) {
                setSelectedSize(sizes[0]);
                setSelectedPrice(sizes[0].price);
            } else {
                setSelectedSize(null);
                setSelectedPrice(null);
            }
        } else {
            // Clear selections if no variations of this type exist
            setSelectedVariation(null);
            setAvailableSizes([]);
            setSelectedSize(null);
            setSelectedPrice(null);
        }
    };

    const handleVariationClick = (variation) => {
        setSelectedVariation(variation);

        // Update available sizes based on selected variation
        const sizes = variation.subVariations || [];
        setAvailableSizes(sizes);

        // Reset size selection
        if (sizes.length > 0) {
            setSelectedSize(sizes[0]);
            setSelectedPrice(sizes[0].price);
        } else {
            setSelectedSize(null);
            setSelectedPrice(null);
        }
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
        setSelectedPrice(size.price);
    };

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? null : section);
    };

    // Color name to CSS color conversion helper
    const getColorStyle = (colorName) => {
        const colorMap = {
            "red": "#ff0000",
            "green": "#00ff00",
            "blue": "#0000ff",
            "yellow": "#ffff00",
            "black": "#000000",
            "white": "#ffffff",
            "purple": "#800080",
            "orange": "#ffa500",
            "pink": "#ffc0cb",
            "brown": "#a52a2a",
            "grey": "#808080",
            "gray": "#808080"
        };

        const lowerCaseColor = colorName.toLowerCase();
        return colorMap[lowerCaseColor] || lowerCaseColor;
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
                                    className={`h-24 w-24 border-2 ${
                                        mainImage === img ? "border-[#FF902B]" : "border-gray-200"
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

                        {/* Only show variation sections if not a book */}
                        {category !== "Books" && (colorVariations.length > 0 || materialVariations.length > 0) && (
                            <div className="mt-6">
                                {/* Variation Type Tabs */}
                                <div className="flex mb-4">
                                    {colorVariations.length > 0 && (
                                        <button
                                            className={`py-2 px-4 ${
                                                activeVariationType === "Color" 
                                                    ? "border-b-2 border-orange-500 font-medium text-orange-500" 
                                                    : "text-gray-500"
                                            }`}
                                            onClick={() => handleVariationTypeChange("Color")}
                                        >
                                            Color Options
                                        </button>
                                    )}
                                    
                                    {materialVariations.length > 0 && (
                                        <button
                                            className={`py-2 px-4 ${
                                                activeVariationType === "Material" 
                                                    ? "border-b-2 border-orange-500 font-medium text-orange-500" 
                                                    : "text-gray-500"
                                            }`}
                                            onClick={() => handleVariationTypeChange("Material")}
                                        >
                                            Material Options
                                        </button>
                                    )}
                                </div>
                                
                                {/* Color Options */}
                                {activeVariationType === "Color" && (
                                    <div>
                                        <div className="space-y-2 mb-4">
                                            <label className="text-sm font-medium">Select Color</label>
                                            <div className="flex flex-wrap gap-3">
                                                {colorVariations.map((color, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleVariationClick(color)}
                                                        className={`h-7 w-7 cursor-pointer flex items-center justify-center ${
                                                            selectedVariation?._id === color._id
                                                                ? 'ring-2 ring-offset-1 ring-[#FF902B]'
                                                                : 'border border-gray-300'
                                                        }`}
                                                    >
                                                        <div
                                                            className="h-6 w-6"
                                                            style={{ backgroundColor: getColorStyle(color.variationInfo) }}
                                                            title={color.variationInfo}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Material Options */}
                                {activeVariationType === "Material" && (
                                    <div>
                                        <div className="space-y-2 mb-4">
                                            <label className="text-sm font-medium">Select Material</label>
                                            <div className="flex flex-wrap gap-2">
                                                {materialVariations.map((material, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleVariationClick(material)}
                                                        className={`px-3 py-2 rounded border font-medium ${
                                                            selectedVariation?._id === material._id
                                                                ? "bg-orange-500 text-white"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                        {material.variationInfo}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Size Section - Only show if a variation is selected */}
                                {selectedVariation && availableSizes.length > 0 && (
                                    <div className="space-y-2 mb-3">
                                        <label className="text-sm font-medium">
                                            Select Size for {selectedVariation.variationInfo}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {availableSizes.map((size, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSizeClick(size)}
                                                    className={`h-9 px-3 min-w-20 rounded border font-medium ${
                                                        selectedSize?._id === size._id
                                                            ? "bg-orange-500 text-white"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {size.subVariationType}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Price display */}
                                {selectedPrice && (
                                    <div className="mt-3">
                                        <p className="font-medium">
                                            Price: <span className="text-xl font-bold">₹ {selectedPrice}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                        
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