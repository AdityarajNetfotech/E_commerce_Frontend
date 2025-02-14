import React from 'react'
import CustomNavbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/footer/Footer'
import OrderSummary from '../../../Components/order-summary/OrderSummary'
import Header from './header/CartHeader'

function DeliveryAddress() {
    
    return (
        <>
            <CustomNavbar />
            <Header/>


            <p className='text-3xl font-bold text-center my-6'>Enter Delivery Address</p>

            <section className='mb-12'>
                <div className='flex flex-col lg:flex-row justify-center items-start p-4 gap-8'>
                    <div className="text-[#635D5A] w-full lg:w-[1000px] mx-auto bg-white shadow-lg p-6 rounded-lg">
                        <h2 className="text-xl font-bold text-center">Contact Details</h2>

                        <form>
                            <div className="space-y-4">
                                <div className="relative">
                                    <label htmlFor="" className='pl-0.5'>Email ID*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="abc@xyz.com"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <label htmlFor="" className='pl-0.5'>Phone Number*</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+91 0000000000"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-xl font-semibold mb-4 text-center">Address</h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label htmlFor="" className='pl-0.5'>Address Line 1*</label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            placeholder="Address (House no, Building, Street, Area)"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="" className='pl-0.5'>Address Line 2*</label>
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            placeholder="Address (House no, Building, Street, Area)"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label htmlFor="" className='pl-0.5'>Pin Code*</label>
                                            <input
                                                type="text"
                                                name="pinCode"
                                                placeholder="0000"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="" className='pl-0.5'>Locality/Town*</label>
                                            <input
                                                type="text"
                                                name="locality"
                                                placeholder="Locality/Town"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label htmlFor="" className='pl-0.5'>City/District*</label>
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="City Name"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="" className='pl-0.5'>State*</label>
                                            <input
                                                type="text"
                                                name="state"
                                                placeholder="State Name"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>


                    <OrderSummary />
                </div>
            </section>



            <Footer />
        </>
    )
}

export default DeliveryAddress
