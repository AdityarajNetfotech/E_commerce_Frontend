import React from 'react'
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/footer/Footer'
import Header from '../ProductCatalogue/header/Header'

function ManageStudent() {
    return (
        <>
            <div className="flex flex-col lg:flex-row min-h-screen ">
                <div>
                    <Sidebar />
                </div>
                
                <div className=" flex flex-col flex-1 ">
                    <Header heading={"Manage Student"} />

                    <div className="flex-1 overflow-auto">

                        <div className="min-h-screen p-4 bg-[#ECECEC]">
                            <div className="rounded-2xl p-6 shadow-sm bg-white">
                                <div className='bg-[#FFF3CE] rounded-2xl px-3 py-6'>
                                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search something"
                                                className="bg-white pr-10 pl-4 py-2 rounded-lg w-full md:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                            />
                                            <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white">
                                                <span className="text-gray-600">Sort by: Latest</span>
                                            </button>
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white">
                                                <span className="text-gray-600">Month: January</span>
                                            </button>
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white">
                                                <span className="text-gray-600">Grade: Fourth</span>
                                            </button>
                                            <button className="text-blue-600 hover:text-blue-700">
                                                <i className="fa-solid fa-rotate-left" />
                                                Reset Filter
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold">100</span>
                                                <span className="text-gray-600">Total Students</span>
                                            </div>
                                            <div className="w-px h-6 bg-amber-200" />
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold">40</span>
                                                <span className="text-gray-600">Fourth Grade students</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full overflow-hidden">
                                    <div className="max-w-full overflow-x-auto">
                                        <table className="w-full min-w-max border-separate border-spacing-y-2">

                                            <thead className=''>
                                                <tr className="bg-[#ECECEC]">
                                                    <th className="text-left py-4 px-4 font-medium text-gray-600 rounded-l-xl">Student Name</th>
                                                    <th className="text-left py-4 font-medium text-gray-600">Email Id</th>
                                                    <th className="text-left py-4 font-medium text-gray-600">Mobile No.</th>
                                                    <th className="text-left py-4 font-medium text-gray-600">Grade</th>
                                                    <th className="text-left py-4 font-medium text-gray-600">Gender</th>
                                                    <th className="text-left py-4 font-medium text-gray-600">Last Active</th>
                                                    <th className="text-left py-4 font-medium text-gray-600 rounded-r-xl">All Orders</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 space-y-2">
                                                <tr className="bg-[#FFFAEA]">
                                                    <td className="py-4 px-2 rounded-l-xl text-center">John Bushmill</td>
                                                    <td className="py-4 px-2 text-center">Bhagyashree.Radhakrishnan@gmail.com</td>
                                                    <td className="py-4 text-center">+91 987654321</td>
                                                    <td className="py-4 text-center">Fourth</td>
                                                    <td className="py-4 text-center">F</td>
                                                    <td className="py-4 text-center">29 Dec'24</td>
                                                    <td className="py-4 rounded-r-xl text-center">
                                                        <button className="flex justify-center items-center gap-1 text-gray-600 hover:text-blue-600">
                                                            05 items
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr className="bg-[#F4F4F4]">
                                                    <td className="py-4 px-2 rounded-l-xl text-center">John Bushmill</td>
                                                    <td className="py-4 px-2 text-center">Bhagyashree.Radhakrishnan@gmail.com</td>
                                                    <td className="py-4 text-center">+91 987654321</td>
                                                    <td className="py-4 text-center">Sixth</td>
                                                    <td className="py-4 text-center">M</td>
                                                    <td className="py-4 text-center">29 Dec'24</td>
                                                    <td className="py-4 rounded-r-xl text-center">
                                                        <button className="flex justify-center items-center gap-1 text-gray-600 hover:text-blue-600">
                                                            05 items
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>



                                        </table>
                                    </div>
                                </div>


                                <div className="flex items-center justify-center mt-6">
                                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                                        <i className="fa-solid fa-angle-left" />
                                        Prev
                                    </button>
                                    <span className="text-gray-600">Page 01</span>
                                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                                        Next
                                        <i className="fa-solid fa-angle-right" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />


        </>
    )
}

export default ManageStudent

