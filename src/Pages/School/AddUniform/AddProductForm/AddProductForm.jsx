import React, { useState } from "react";
import dltbtn from "../../../../Components/Images/DangerButton.png"
import attach from "../../../../Components/Images/Attach.png"
import media from "../../../../Components/Images/Media.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";


const AddProductForm = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [SKU, setSKU] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");
  const [images, setImages] = useState([null, null, null]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [variations, setVariations] = useState([{
    variationType: "Material",
    variationInfo: "",
    secondVariationType: "Color",
    secondVariationInfo: "",
    subVariations: [
      {
        subVariationType: "",
        subVariationInfo: "",
        stockQty: "",
        price: "",
      },
    ],
  }]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("schoolToken");


  const handleImageChange = (e, index) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = { file, previewURL: reader.result };

        if (selectedIndex === null) setSelectedIndex(index);
        return newImages;
      });
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;


      if (selectedIndex === index) {
        const firstAvailable = newImages.findIndex((img) => img !== null);
        setSelectedIndex(firstAvailable !== -1 ? firstAvailable : null);
      }

      return newImages;
    });
  };

  const handleCancel = () => {
    setProductName("");
    setSubCategory("");
    setProductDetail("");
    setDescription("");
    setGender("");
    setSKU("");
    setSellerDescription("");
    setImages([null, null, null]);
    setVariations([
      {
        variationType: "",
        variationInfo: "",
        secondVariationType: "",
        secondVariationInfo: "",
        subVariations: [
          {
            subVariationType: "",
            subVariationInfo: "",
            stockQty: "",
            price: "",
          },
        ],
      },
    ]);
    setError("");
  };

  const handleAddVariant = () => {
    setVariations([
      ...variations,
      {
        variationType: "Material",
        variationInfo: "",
        secondVariationType: "Color",
        secondVariationInfo: "",
        subVariations: [
          {
            subVariationType: "",
            subVariationInfo: "",
            stockQty: "",
            price: "",
          },
        ],
      },
    ]);
  };

  const handleDeleteVariant = (index) => {
    const updatedVariations = variations.filter((_, i) => i !== index);
    setVariations(updatedVariations);
  };

  const handleAddSubVariant = (variantIndex) => {
    const updatedVariations = [...variations];
    updatedVariations[variantIndex].subVariations.push({
      subVariationType: "",
      subVariationInfo: "",
      stockQty: "",
      price: "",
    });
    setVariations(updatedVariations);
  };

  const handleDeleteSubVariant = (variantIndex, subVariantIndex) => {
    const updatedVariations = [...variations];
    updatedVariations[variantIndex].subVariations = updatedVariations[
      variantIndex
    ].subVariations.filter((_, i) => i !== subVariantIndex);
    setVariations(updatedVariations);
  };

  const handleInputChange = (e, variantIndex, subVariantIndex = null) => {
    const { name, value } = e.target;
    const updatedVariations = [...variations];

    if (subVariantIndex !== null) {
      updatedVariations[variantIndex].subVariations[subVariantIndex][name] = value;
    } else {
      updatedVariations[variantIndex][name] = value;

      // Reset info when variation type changes
      if (name === "variationType") {
        updatedVariations[variantIndex].variationInfo = "";
      }

      // Reset info when second variation type changes
      if (name === "secondVariationType") {
        updatedVariations[variantIndex].secondVariationInfo = "";
      }
    }

    setVariations(updatedVariations);
  };

  const validateForm = () => {
    if (!productName || !subCategory || !productDetail || !description || !gender || !SKU) {
      setError("All fields are required.");
      return false;
    }
    if (variations.some((variant) => !variant.variationType || !variant.variationInfo)) {
      setError("All variations must have a type and info.");
      return false;
    }
    if (variations.some((variant) =>
      variant.subVariations.some((sub) => !sub.stockQty || sub.stockQty < 0 || !sub.price || sub.price < 0)
    )) {
      setError("All sub-variants must have valid stock and price.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Log the exact structure of variations for debugging
    console.log("Variations:", JSON.stringify(variations, null, 2));

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("category", "Uniform");
    formData.append("productDetail", productDetail);
    formData.append("SKU", SKU);

    // Try sending the data in a format the server may expect
    formData.append("uniformDetails", JSON.stringify({ subCategory, gender, variations }));


    // Only append valid images
    images.forEach((imageObj, index) => {
      if (imageObj?.file) {
        console.log(`Appending image ${index}:`, imageObj.file.name, imageObj.file.type, imageObj.file.size);
        formData.append('image', imageObj.file);
      }
    });

    try {
      // Add debugging logs
      // console.log("Sending request to:", "http://localhost:5000/api/product/add");
      console.log("With token:", token ? "Token present" : "No token");

      const response = await axios.post("http://localhost:5000/api/product/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status >= 200 && response.status < 300) {
        const uploadedImages = response.data?.image || [];

        console.log("Uploaded Images from Backend:", uploadedImages);

        const updatedProductData = {
          name: productName,
          description,
          category: "Uniform",
          productDetail,
          SKU,
          subCategory,
          gender,
          variations,
          image: uploadedImages,
        };

        console.log("Final Product Data Before Navigation:", updatedProductData);

        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 3000,
          className: "bg-green-500 text-white font-semibold p-4 rounded-md shadow-md",
          bodyClassName: "text-sm",
          progressClassName: "bg-green-700",
          onClose: () => navigate("/ProdReview", { state: { productData: updatedProductData } }),
        });

        setTimeout(() => navigate("/ProdReview", { state: { productData: updatedProductData } }), 2000);
      } else {
        toast.error(response.data?.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error adding product:", err);

      // Log more details about the error response
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      }

      toast.error("Error submitting form!");
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-100 p-6 ">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">General Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <div className=" h-[286px] border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center">
                  {selectedIndex !== null && images[selectedIndex] ? (<img
                    src={images[selectedIndex].previewURL}
                    alt="Placeholder for main product image"
                    className="mb-4 w-[120px] h-[120px] object-cover"
                  />) : (
                    <p className="text-gray-500 mb-4">
                      Drag and drop image here, or click add image
                    </p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, images.findIndex((img) => img === null))}
                    className="hidden"
                    id="main-upload"
                  />
                  <label
                    htmlFor="main-upload"
                    className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer"
                  >
                    Add Media
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`border-2 p-4 rounded-lg flex items-center justify-center relative ${selectedIndex === index ? "border-orange-400" : "border-dashed border-gray-300"
                        }`}
                      onClick={() => img && setSelectedIndex(index)}
                    >
                      {img ? (
                        <>
                          <img src={img.previewURL} alt={`Additional image ${index + 1}`} width="50" height="50" />
                          <button
                            className="absolute top-1 right-1 bg-gray-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <label className="text-gray-500 cursor-pointer">
                          Add Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, index)}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-1 grid grid-cols-1 gap-4">
                <div>Cataegory : Uniform</div>
                <div>
                  <label className="block text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Type product name here..."
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Sub Cataegory (if any)</label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mt-1 text-gray-700">
                    <option value="" disabled>
                      Select from shoes, sweater, blazer, etc
                    </option>
                    <option value="Shoes">Shoes</option>
                    <option value="Sweater">Sweater</option>
                    <option value="Blazer">Blazer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Product Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Type product description here..."
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700">Product Detail</label>
                  <textarea
                    value={productDetail}
                    onChange={(e) => setProductDetail(e.target.value)}
                    placeholder="Enter Length, width, details, usage etc"
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Select Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full border border-gray-300 text-gray-700 p-2 rounded mt-1">
                      <option value="" disabled selected>
                        Select...
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">SKU</label>
                    <input
                      type="text"
                      value={SKU}
                      onChange={(e) => setSKU(e.target.value)}
                      placeholder="Type product SKU here..."
                      className="w-full border border-gray-300 p-2 rounded mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Variation</h2>
            {variations.map((variant, variantIndex) => (
              <div key={variantIndex} className="pb-2 mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Material
                    </label>
                    <select
                      name="variationType"
                      value="Material"
                      disabled
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="Material">Material</option>
                    </select>
                  </div>

                  <div className="relative flex items-end">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700">
                        Material
                      </label>
                      <select
                        name="variationInfo"
                        value={variant.variationInfo}
                        onChange={(e) => handleInputChange(e, variantIndex)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select Material</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Polyester">Polyester</option>
                        <option value="Leather">Leather</option>
                        <option value="Silk">Silk</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => handleDeleteVariant(variantIndex)}
                    >
                      <img src={dltbtn} alt="Delete" className="h-[40px] w-[40px]" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Color
                    </label>
                    <select
                      name="secondVariationType"
                      value="Color"
                      disabled
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="Color">Color</option>
                    </select>
                  </div>
                  <div className="relative flex items-end">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700">
                        Color
                      </label>
                      <select
                        name="secondVariationInfo"
                        value={variant.secondVariationInfo || ""}
                        onChange={(e) => handleInputChange(e, variantIndex)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select Color</option>
                        <option value="Red">Red</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Green">Green</option>
                        <option value="Blue">Blue</option>
                      </select>
                    </div>
                  </div>
                </div>

                {variant.subVariations.map((subVariant, subVariantIndex) => (
                  <div
                    key={subVariantIndex}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sub Variation Type
                      </label>
                      <select
                        name="subVariationType"
                        value={subVariant.subVariationType}
                        onChange={(e) =>
                          handleInputChange(e, variantIndex, subVariantIndex)
                        }
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sub Variant Info
                      </label>
                      <select
                        name="subVariationInfo"
                        value={subVariant.subVariationInfo}
                        onChange={(e) =>
                          handleInputChange(e, variantIndex, subVariantIndex)
                        }
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select Size</option>
                        <option value="5">Size</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Stock Qty
                      </label>
                      <input
                        type="number"
                        name="stockQty"
                        value={subVariant.stockQty}
                        onChange={(e) =>
                          handleInputChange(e, variantIndex, subVariantIndex)
                        }
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700">
                          Price (in Rs)
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={subVariant.price}
                          onChange={(e) =>
                            handleInputChange(e, variantIndex, subVariantIndex)
                          }
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Price"
                        />
                      </div>
                      <div className="ml-2 flex items-center">
                        <button
                          type="button"
                          className="shadow-md flex items-center justify-center h-[40px] w-[40px]"
                          onClick={() =>
                            handleDeleteSubVariant(variantIndex, subVariantIndex)
                          }
                        >
                          <img src={dltbtn} alt="Delete" className="h-full w-full" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center mb-4 border-b border-gray-300 pb-4">
                  <button
                    type="button"
                    className="w-48 bg-yellow-100 text-yellow-600 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    onClick={() => handleAddSubVariant(variantIndex)}
                  >
                    Add Sub Variant +
                  </button>
                  <button type="button" className="ml-4 text-gray-500 flex items-center">
                    <img src={attach} alt="Attach" /> Attach Image
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="w-48 bg-black text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              onClick={handleAddVariant}
            >
              Add Variant +
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-6">
          <div className="flex justify-end space-x-2 mt-4 max-w-4xl mx-auto mb-3">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-black text-white px-3 py-1 rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-3 py-1 rounded-lg"
            >
              Done
            </button>
            <ToastContainer />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProductForm;