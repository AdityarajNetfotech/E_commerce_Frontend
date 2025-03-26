import React, { useState, useEffect } from 'react';
import { useLocation , useNavigate} from "react-router-dom";


function ProductReviewForm() {

  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate


  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [category, setCategory] = useState("");



  const [openAccordion, setOpenAccordion] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  

  useEffect(() => {
    console.log("Location State:", location.state);
    if (location.state?.productData) {

      const productData = location.state.productData;

      const categoryType = productData.category;

      console.log("Product Data:", productData);
      console.log("Category:", categoryType);
      console.log("Product Images:", productData.image);

      const images = productData.images?.length > 0 ? productData.images : productData.image;
      console.log("Product Images:", images);

      setProduct({
        ...productData,
        images: images || []
      });

      setCategory(categoryType);


      if (images?.length > 0) {
        console.log("Setting Main Image:", images[0]);
        setMainImage(images[0]);
      }
    }
  }, [location.state]);

  const productImages = product?.images?.length > 0 ? product.images : [];
  console.log("Final Images for Display:", productImages);

  if (!product) {
    return <p className="text-center text-gray-500">Loading product details...</p>;
  }




  console.log("Final Product State:", product);

  console.log("Main Image:", mainImage);


  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-2 py-8 px-4">
      <div className="flex space-x-4">
        <div className="flex flex-col space-y-14">

          {productImages.length > 0 ? (
            productImages.map((img, index) => (

              <div
                key={index}
                className={`h-24 w-24 border-2 ${mainImage === img ? "border-[#FF902B]" : "border-gray-200"} cursor-pointer`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`Thumbnail ${index}`} className="h-full w-full object-cover" />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>

        <div className="flex-1">
          <img src={mainImage} alt="Main Display" className="w-full h-[400px] object-contain border border-gray-300" />
        </div>
      </div>


      <div>


     {category === "Uniform" && (
       <>
      {/* Product Name, Category, Description */}
      <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-3">Sub Category - {product.subCategory}</p>
      <hr />
      <p className="text-md text-gray-500 mt-2">{product.description}</p>

      {/* SKU & Gender */}
      <div className="flex gap-10">
        <div className="text-gray-600 font-medium text-sm flex gap-2 mt-4 mb-3">
          <button className="h-13 w-25 rounded border border-red-400 bg-red-50">
            SKU : {product.SKU}
          </button>
        </div>
        <div className="text-gray-600 text-sm font-medium flex gap-2 mt-4 mb-3">
          Gender
          <button className="h-6 w-15 rounded border border-yellow-400 bg-yellow-50">
            {product.gender}
          </button>
        </div>
      </div>

      {/* Mapping Variations (Color, Material, etc.) */}
      {product.variations?.map((variation, index) => (
        <div key={index} className="p-4 border-t border-gray-300">
          <div className="space-y-2 mb-3">
            <label className="text-sm font-medium flex gap-3">
              {variation.variationType}
              <div className="flex space-x-2">
                {variation.variationType === "Color" ? (
                  <div
                    className="h-5 w-5 rounded-full border-2 border-white ring-2 ring-gray-200"
                    style={{ backgroundColor: variation.variationInfo }}
                  />
                ) : (
                  <div className="flex space-x-2">{variation.variationInfo}</div>
                )}
              </div>
            </label>
          </div>

          {/* Mapping SubVariations (Size, Info, Stock, Price) */}
          {variation.subVariations?.map((subVar, subIndex) => (
            <div key={subIndex}>
              <div className="text-2xl font-bold mt-1 mb-3">₹ {subVar.price}</div>

              <div className="flex gap-10 space-y-2 mt-1 mb-2">
                {/* Size */}
                <div className="text-gray-600 text-sm flex gap-2">
                  Size
                  <button className="h-6 w-6 rounded border border-amber-400 bg-amber-50">
                    {subVar.subVariationType}
                  </button>
                </div>

                {/* Info */}
                <div className="text-gray-600 text-sm flex gap-2">
                  Info
                  <button className="h-6 w-6 rounded border border-amber-400 bg-amber-50">
                    {subVar.subVariationInfo}
                  </button>
                </div>

                {/* Stock */}
                <div className="text-gray-600 text-sm flex gap-2">
                  Stock
                  <button className="h-6 w-8 rounded border border-amber-400 bg-amber-50">
                    {subVar.stockQty}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}


            <div className="flex items-center space-x-4 mb-6">
              <button
            className="w-full rounded-md bg-orange-500 h-8 text-white"
            onClick={() => navigate("/add-product")} // Navigate on button click
          >
            Add Product
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
                    <p className="text-gray-700">{product.productDetail}</p> {/* product detail */}
                  </div>
                </div>
              </div>

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
                    <p><strong>Seller:</strong> ABC Uniforms</p>
                    <p><strong>Location:</strong> Mumbai, India</p>
                    <p><strong>Contact:</strong> +91 9876543210</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {category === "Books" && product && (
          <>
            <h1 className="text-2xl font-semibold mb-3">{product.name}</h1>  {/* product name */}

            <hr />
            <p className="text-sm text-gray-500 mt-2">
              {product.description} {/* product description */}
            </p>
            <div className='flex gap-10'>
              <div className="text-gray-600 font-medium text-sm flex gap-2 mt-4 mb-3">
                <button


                  className="h-10 w-25 rounded border  border-red-400 bg-red-50"
                >
                  SKU : {product.SKU}
                </button></div>

            </div>

            {product.bookDetails && (
              <div >
                <div className="text-2xl font-bold mt-1 mb-4">₹ {product.bookDetails.price}</div>  {/* Subvariation-price */}



                <div className="flex gap-10 space-y-2 mt-1 mb-4">

                  <div className="text-gray-600 text-sm flex gap-2 mt-1 mb-">Grade
                    <button


                      className="h-6 w-6 rounded border  border-amber-400 bg-amber-50"
                    >
                      {product.bookDetails.grade}
                    </button>
                  </div> {/* SubvariationType- grade */}
                  <div className="text-gray-600 text-sm flex gap-2  mt-1 mb-1">Subject
                    <button


                      className="h-6 w-20 rounded border  border-amber-400 bg-amber-50"
                    >
                      {product.bookDetails.subject}
                    </button>
                  </div> {/* SubvariationInfo-subject */}
                  <div className="text-gray-600 text-sm flex gap-2 mt-1 mb-1">Stock
                    <button


                      className="h-6 w-8 rounded border  border-amber-400 bg-amber-50"
                    >
                      {product.bookDetails.stockQty}
                    </button>
                  </div> {/* Subvariation-stock */}
                </div>




              </div>
            )}


            <div className="flex items-center space-x-4 mb-6">
              
            <button
            className="w-full rounded-md bg-orange-500 h-8 text-white"
            onClick={() => navigate("/add-product")} // Navigate on button click
              >
            Add Product
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
                    <p className="text-gray-700">{product.productDetail}</p> {/* product detail */}
                  </div>
                </div>
              </div>

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
                    <p><strong>Seller:</strong> ABC Uniforms</p>
                    <p><strong>Location:</strong> Mumbai, India</p>
                    <p><strong>Contact:</strong> +91 9876543210</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {category === "Stationary" && product && (
          <>
            <h1 className="text-2xl font-semibold mb-3">{product.name}</h1>  {/* product name */}

            <hr />
            <p className="text-sm text-gray-500 mt-2">
              {product.description} {/* product description */}
            </p>
            <div className='flex gap-10'>
              <div className="text-gray-600 font-medium text-sm flex gap-2 mt-4 mb-2">
                <button


                  className="h-10 w-25 rounded border  border-red-400 bg-red-50"
                >
                  SKU : {product.SKU}
                </button></div>

            </div>

            {product.stationaryDetails && (
              <div >
                <div className="text-2xl font-bold mt-2 mb-3">₹ {product.stationaryDetails.price}</div>  {/* Subvariation-price */}



                <div className=" space-y-2 mt-1 mb-2">

                 
                  <div className="text-gray-600 text-sm flex gap-2 mt-2 mb-4">Stock
                    <button


                      className="h-6 w-8 rounded border  border-amber-400 bg-amber-50"
                    >
                      {product.stationaryDetails.stockQty}
                    </button>
                  </div> {/* Subvariation-stock */}
                </div>




              </div>
            )}


            <div className="flex items-center space-x-4 mb-6">
             
            <button
            className="w-full rounded-md bg-orange-500 h-8 text-white"
            onClick={() => navigate("/add-product")} // Navigate on button click
              >
            Add Product
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
                    <p className="text-gray-700">{product.productDetail}</p> {/* product detail */}
                  </div>
                </div>
              </div>

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
                    <p><strong>Seller:</strong> ABC Uniforms</p>
                    <p><strong>Location:</strong> Mumbai, India</p>
                    <p><strong>Contact:</strong> +91 9876543210</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>

    </section>
  );
}

export default ProductReviewForm;
