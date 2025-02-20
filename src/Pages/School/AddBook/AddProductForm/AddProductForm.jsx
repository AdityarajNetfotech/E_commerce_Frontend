import React, { useState } from "react";
import dltbtn from "../../../../Components/Images/DangerButton.png"
import media from "../../../../Components/Images/Media.png"

const AddProductForm = () => {

  const [rows, setRows] = useState([
    { id: 1, type: "grade", grade: "", subject: "" },
    { id: 2, type: "stock", stockQty: "", price: "" },
  ]);



  const handleDeleteRow = (id) => {
    if (id === 1) {

      setRows([]);
    } else {

      setRows(rows.filter((row) => row.id !== id));
    }
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
              <div>Cataegory : Books</div>
              <div>
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  placeholder="Type product name here..."
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                />
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
              <div className="grid grid-cols-1">
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
          <h2 className="text-xl font-semibold mb-4">Product Info and variants</h2>


          {rows.map((row) => (
            <div key={row.id} className="flex items-center space-x-4 mb-4">

              {row.type === "grade" && (
                <>

                  <div className="flex-1">
                    <label
                      htmlFor={`grade-${row.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Grade
                    </label>
                    <select
                     
                      id={`grade-${row.id}`}
                      value={row.grade}
                      onChange={(e) =>
                        setRows(
                          rows.map((r) =>
                            r.id === row.id
                              ? { ...r, grade: e.target.value }
                              : r
                          )
                        )
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      
                    >
                    <option>Select Class</option>
                    <option value="small">1</option>
                    <option value="medium">2</option>
                     </select>
                  </div>


                  <div className="flex-1">
                    <label
                      htmlFor={`subject-${row.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <select
                      
                      id={`subject-${row.id}`}
                      value={row.subject}
                      onChange={(e) =>
                        setRows(
                          rows.map((r) =>
                            r.id === row.id
                              ? { ...r, subject: e.target.value }
                              : r
                          )
                        )
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      
                    > 
                    <option>Select</option>
                    <option value="english">English</option>
                    <option value="maths">Maths</option>
                    </select>
                  </div>
                </>
              )}


              {row.type === "stock" && (
                <>

                  <div className="flex-1">
                    <label
                      htmlFor={`stockQty-${row.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Stock Qty
                    </label>
                    <select
                      id={`stockQty-${row.id}`}
                      value={row.stockQty}
                      onChange={(e) =>
                        setRows(
                          rows.map((r) =>
                            r.id === row.id
                              ? { ...r, stockQty: e.target.value }
                              : r
                          )
                        )
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select…</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </div>


                  <div className="flex-1">
                    <label
                      htmlFor={`price-${row.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price (in Rs)
                    </label>
                    <input
                      type="text"
                      id={`price-${row.id}`}
                      value={row.price}
                      onChange={(e) =>
                        setRows(
                          rows.map((r) =>
                            r.id === row.id
                              ? { ...r, price: e.target.value }
                              : r
                          )
                        )
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Price"
                    />
                  </div>
                </>
              )}


              <button
                onClick={() => handleDeleteRow(row.id)}
                className="mt-6 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img src={dltbtn} alt="Delete" />
              </button>
            </div>
          ))}
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
          <button className="bg-orange-500 text-white px-3 py-1 rounded-lg">
            Done
          </button>
        </div>
      </div>

    </>

  );
};

export default AddProductForm;
