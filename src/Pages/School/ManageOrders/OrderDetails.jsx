import React from 'react'

function OrderDetails() {
    return (
        <>
            <section className='py-6 px-4 max-h-[90vh] overflow-y-auto max-w-[90vw] mx-auto mt-7 rounded-2xl shadow-lg'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold'>Order Detail</h1>
                    <ul className='flex gap-4'>
                        <li>April 24, 2024</li>
                        <li>3 Products</li>
                    </ul>
                </div>

                <hr className='my-2' />

                <div className="flex items-center justify-center mt-8">
                    <div className="w-full bg-[#FFF3CE] rounded-2xl shadow-lg overflow-hidden p-4">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/5 flex justify-center items-center">
                                <div className="rounded-xl">
                                    <h2 className="text-gray-600 mb-2">Order ID</h2>
                                    <p className="text-2xl font-bold text-gray-900">#1255</p>
                                </div>
                            </div>

                            <div className="md:w-5/12 bg-white p-4 md:p-5 shadow-lg rounded-2xl">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Billing Address</h2>

                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-gray-500">EMAIL</p>
                                            <p className="text-gray-700">dainne.ressell@gmail.com</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">PHONE</p>
                                            <p className="text-gray-700">(671) 555-0110</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-700 font-medium">Dainne Russell</p>
                                            <p className="text-gray-600">4140 Parker Rd. Allentown, New Mexico 31134</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-5/12 md:ml-auto bg-white p-4 md:p-5 shadow-lg rounded-2xl">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Total</h2>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="text-gray-900">₹ 2000</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Discount (-20%)</span>
                                            <span className="text-orange-500">-600</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Shipping Charges</span>
                                            <span className="text-gray-900">₹ 50</span>
                                        </div>
                                        <hr />
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-900 font-medium">Total</span>
                                            <span className="text-green-600 text-xl font-bold">₹ 1450</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* content */}
                <div className='space-y-6 mt-10'>
                    <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-300">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <i class="fa-solid fa-box-archive" />
                            <span className="text-green-600">Delivered</span>
                            <span className="text-gray-500">on Friday, 15th September</span>
                        </div>

                        <hr className='mt-1 mb-3' />

                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <img src="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Girls Uniform Set" className="w-20 h-20 object-cover rounded-md" />

                            <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Girls Uniform Set with Blazer</h3>
                                    <p className="text-gray-500 text-sm mt-1">Order ID: 123456656</p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                                        <span className="text-gray-600 font-medium">₹ 700</span>
                                        <span className="text-gray-600">Qty: <span className="font-medium">01</span></span>
                                        <span className="text-gray-600">Size: <span className="font-medium">03</span></span>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center mt-3 md:mt-0 text-sm text-blue-600 gap-1'>
                                    <button className="bg-[#FFF3CE] text-[#5B5454] py-1 rounded-lg text-sm font-medium w-32 m-auto cursor-pointer">
                                        Exchange
                                    </button>
                                    <p className="text-sm text-gray-600 cursor-default">
                                        <span className="font-medium">Estimated Pickup:</span> <span className='font-bold'>25th October 2023</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-300">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <i class="fa-solid fa-arrow-right" />
                            <span className="text-blue-600">In Transit</span>
                            <span className="text-gray-500">arriving on Friday, 15th September</span>
                        </div>

                        <hr className='mt-1 mb-3' />

                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <img src="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Girls Uniform Set" className="w-20 h-20 object-cover rounded-md" />

                            <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Girls Uniform Set with Blazer</h3>
                                    <p className="text-gray-500 text-sm mt-1">Order ID: 123456656</p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                                        <span className="text-gray-600 font-medium">₹ 700</span>
                                        <span className="text-gray-600">Qty: <span className="font-medium">01</span></span>
                                        <span className="text-gray-600">Size: <span className="font-medium">03</span></span>
                                    </div>
                                </div>
                                <div className="mt-3 md:mt-0 text-sm text-blue-600 flex items-center gap-1 cursor-default">
                                    <span><i className="fa-solid fa-arrow-rotate-left" /> Exchange/Return available till 20th Sept</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-300">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <i class="fa-solid fa-arrow-right" />
                            <span className="text-blue-600">In Transit</span>
                            <span className="text-gray-500">arriving on Friday, 15th September</span>
                        </div>

                        <hr className='mt-1 mb-3' />

                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <img src="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Girls Uniform Set" className="w-20 h-20 object-cover rounded-md" />

                            <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Girls Uniform Set with Blazer</h3>
                                    <p className="text-gray-500 text-sm mt-1">Order ID: 123456656</p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                                        <span className="text-gray-600 font-medium">₹ 700</span>
                                        <span className="text-gray-600">Qty: <span className="font-medium">01</span></span>
                                        <span className="text-gray-600">Size: <span className="font-medium">03</span></span>
                                    </div>
                                </div>
                                <div className="mt-3 md:mt-0 text-sm text-blue-600 flex items-center gap-1 cursor-default">
                                    <span><i className="fa-solid fa-arrow-rotate-left" /> Exchange/Return available till 20th Sept</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default OrderDetails
