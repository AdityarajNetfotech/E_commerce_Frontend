import React from 'react'
import CustomNavbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/footer/Footer'
import SidebarButtons from '../../../Components/button/Button'
import Header from '../MyOrders/header/OrderHeader'

function AccountDetails() {
    const accountdetail = "Account Detail"

    return (
        <>
            <CustomNavbar />
            <Header heading={accountdetail} />

            <section className='flex flex-col lg:flex-row justify-center items-start bg-[#ECECEC] p-15 gap-8'>
                <SidebarButtons />
                <div className='w-full lg:w-[750px] bg-white shadow-lg rounded-lg p-8'>

                    <h2 className="text-[22px] font-bold mb-4">Account Details</h2>
                    <hr className="mb-6" />

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input type="text" className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none focus:border-none" placeholder="Enter Full Name" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none focus:border-none" placeholder="Enter Email" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Mobile Number</label>
                            <input type="tel" className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none focus:border-none" placeholder="Enter Mobile Number" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Join As *</label>
                            <select className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none focus:border-none">
                                <option>Select Student/School</option>
                                <option>Student</option>
                                <option>School</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Select School *</label>
                            <select className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none focus:border-none">
                                <option>Select School</option>
                                <option>School A</option>
                                <option>School B</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition">
                                Update
                            </button>
                        </div>
                    </form>

                </div>
            </section>

            <Footer />
        </>
    )
}

export default AccountDetails
