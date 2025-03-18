import React, { useState } from 'react'
import Sidebar from '../../../Components/SideBar/SideBar'
import Header from "../Dashboard/header/header";
import { Link } from 'react-router-dom'
import Footer from '../../../Components/Footer/Footer'

function AddSubCategory() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const AddSubCategory = "Add Sub-Category"
    
    return (
        <>
            <div>
                <div className="flex flex-col lg:flex-row lg:h-screen min-h-screen">
                    <div>
                        <Sidebar />
                    </div>
                    <div className=" flex flex-col flex-1 ">
                        <Header heading={AddSubCategory} />
                        <section className="flex-1 overflow-auto">
                            <div className="bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl p-6 w-full max-w-3xl mx-auto mt-8">
                                <h1 className='text-gray-800 text-[22px] font-medium text-center mb-4'>Select Category</h1>
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg p-2 relative">
                                        {image ? (
                                            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            <div className="text-center text-gray-500">
                                                <p className="text-sm">Drag and drop or click</p>
                                                <label className="cursor-pointer mt-2 block">
                                                    <input type="file" className="hidden" onChange={handleImageChange} />
                                                    <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Add Media</span>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 ml-6">
                                        <label className="text-gray-700 text-sm font-medium">Category Name</label>
                                        <input
                                            type="text"
                                            placeholder="Category"
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Buttons moved outside the card */}
                            <div className="flex justify-end gap-4 mt-4 max-w-3xl mx-auto">
                                <button className="bg-black text-white px-6 py-2 rounded-md">Cancel</button>
                                <button className="bg-orange-500 text-white px-6 py-2 rounded-md">Next</button>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AddSubCategory
