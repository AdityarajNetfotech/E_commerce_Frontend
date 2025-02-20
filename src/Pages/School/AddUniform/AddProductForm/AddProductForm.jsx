import React, { useState } from "react";
import dltbtn from "../../../../Components/Images/DangerButton.png"
import attach from "../../../../Components/Images/Attach.png"
import media from "../../../../Components/Images/Media.png"
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const navigate = useNavigate();

  const [variations, setVariations] = useState([{
    variationType: "",
    variationInfo: "",
    subVariants: [
      {
        subVariationType: "",
        subVariationInfo: "",
        stockQty: "",
        price: "",
      },
    ],
  }]);

  const handleAddVariant = () => {
    setVariations([
      ...variations,
      {
        variationType: "",
        variationInfo: "",
        subVariants: [
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
    updatedVariations[variantIndex].subVariants.push({
      subVariationType: "",
      subVariationInfo: "",
      stockQty: "",
      price: "",
    });
    setVariations(updatedVariations);
  };

  const handleDeleteSubVariant = (variantIndex, subVariantIndex) => {
    const updatedVariations = [...variations];
    updatedVariations[variantIndex].subVariants = updatedVariations[
      variantIndex
    ].subVariants.filter((_, i) => i !== subVariantIndex);
    setVariations(updatedVariations);
  };

  const handleInputChange = (e, variantIndex, subVariantIndex = null) => {
    const { name, value } = e.target;
    const updatedVariations = [...variations];

    if (subVariantIndex !== null) {
      updatedVariations[variantIndex].subVariants[subVariantIndex][name] = value;
    } else {
      updatedVariations[variantIndex][name] = value;
    }

    setVariations(updatedVariations);
  };


  return (
    <>

      <div className="bg-gray-100 p-6 ">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <div className=" h-[286px] border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center">
                <img
                  src={media}
                  alt="Placeholder for main product image"
                  width="50"
                  height="50"
                  className="mb-4"
                />
                <p className="text-gray-500 mb-4">
                  Drag and drop image here, or click add image
                </p>
                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                  Add Media
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center">
                  <img
                    src={media}
                    alt="Placeholder for additional image 1"
                    width="50"
                    height="50"
                  />
                </div>
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center">
                  <img
                    src={media}
                    alt="Placeholder for additional image 2"
                    width="50"
                    height="50"
                  />
                </div>
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center">
                  <img
                    src={media}
                    alt="Placeholder for additional image 3"
                    width="50"
                    height="50"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 grid grid-cols-1 gap-4">
              <div>Cataegory : Uniform</div>
              <div>
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  placeholder="Type product name here..."
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                />
              </div>
              <div>
                <label className="block text-gray-700">Sub Cataegory (if any)</label>
                <select className="w-full border border-gray-300 p-2 rounded mt-1 text-gray-700">
                  <option value="" disabled selected>
                    Select from shoes, sweater, blazer, etc
                  </option>
                  <option value="option1">Shoes</option>
                  <option value="option2">Sweater</option>
                  <option value="option3">Blazer</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Product Description</label>
                <textarea
                  placeholder="Type product description here..."
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700">Product Detail</label>
                <textarea
                  placeholder="Enter Length, width, details, usage etc"
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Select Gender</label>
                  <select className="w-full border border-gray-300 text-gray-700 p-2 rounded mt-1">
                    <option value="" disabled selected>
                      Select...
                    </option>
                    <option value="option1">Male</option>
                    <option value="option2">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">SKU</label>
                  <input
                    type="text"
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
                    Variation Type
                  </label>
                  <select
                    name="variationType"
                    value={variant.variationType}
                    onChange={(e) => handleInputChange(e, variantIndex)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Select Type (e.g., color)</option>
                    <option value="Color">Color</option>
                    <option value="Material">Material</option>
                  </select>
                </div>
                <div className="relative flex items-end">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700">
                      Variation Info
                    </label>
                    <select
                      name="variationInfo"
                      value={variant.variationInfo}
                      onChange={(e) => handleInputChange(e, variantIndex)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Select (Red)</option>
                      <option value="Red">Red</option>
                      <option value="Yellow">Yellow</option>
                    </select>
                  </div>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => handleDeleteVariant(variantIndex)}
                  >
                    <img src={dltbtn} alt="Delete" className="h-[40px] w-[40px]" />
                  </button>
                </div>
              </div>

              {variant.subVariants.map((subVariant, subVariantIndex) => (
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
                      <option>Size</option>
                      <option value="small">S</option>
                      <option value="medium">M</option>

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
                      <option>05</option>
                      <option value="small">01</option>
                      <option value="medium">02</option>
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
                  className="w-48 bg-yellow-100 text-yellow-600 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={() => handleAddSubVariant(variantIndex)}
                >
                  Add Sub Variant +
                </button>
                <button className="ml-4 text-gray-500 flex items-center">
                  <img src={attach}></img> Attach Image
                </button>
              </div>

            </div>
          ))}

          <button
            className="w-48 bg-black text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            onClick={handleAddVariant}
          >
            Add Variant +
          </button>
        </div>
      </div>



      <div className="bg-gray-100 p-6">
        <div className="bg-white p-4 rounded-lg shadow-md  max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">Seller Information</h2>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Type product description here..."
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4  max-w-4xl mx-auto mb-3">
          <button className="bg-black text-white px-3 py-1 rounded-lg">
            Cancel
          </button>
          <button className="bg-orange-500 text-white px-3 py-1 rounded-lg"
            onClick={() => navigate("/ProdReview")}
          >
            Done
          </button>
        </div>
      </div>

    </>

  );
};

export default AddProductForm;
