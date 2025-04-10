import React, { useState } from "react";
import exchange from "../../../Components/Images/Exchange.png";
import inTransit from "../../../Components/Images/Intransit.png";
import delivered from "../../../Components/Images/Delivered.png";
import red from "../../../Components/Images/RedUni.png"
import replay from "../../../Components/Images/ReplayIcon.png"
import search from "../../../Components/Images/SearchOutline.png"
import { useLocation } from 'react-router-dom';


const AllOrderDetails = () => {
    const location = useLocation();

    const student = location.state;
    console.log("Student's orders:" ,student?.orders || [] );
    const orders = student?.orders || [];


    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        month: 'January',
        sortBy: 'Latest',
        orderType: 'All',
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleResetFilters = () => {
        setFilters({
            month: 'January',
            sortBy: 'Latest',
            orderType: 'All',
        });




    };
    const filteredOrders = orders.filter((order) =>
        order.orderItems?.some(item =>
            item.name?.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
    return (



        <div className="bg-gray-100 p-4">

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto pr-8 space-y-4 custom-scrollbar">
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">All Orders</h1>
                    <span className="text-gray-500 text-sm sm:text-base">April 24, 2023 • {orders.length} Products</span>
                </div>
                <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">

                    <div className="flex flex-wrap items-center gap-4 md:gap-2">

                        <div className="flex items-center space-x-2 bg-white w-full sm:w-auto">
                            <input
                                className="p-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto text-[13px]"
                                type="text"
                                placeholder="Search something"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button className="text-yellow-500 p-2 ">
                                <img src={search} alt="Search" />
                            </button>
                        </div>



                        <div className="bg-white p-1 rounded-lg w-full sm:w-auto">
                            <span className="text-[13px]">Month: </span>
                            <select
                                name="month"
                                className="p-1 border-0 text-[13px] w-full sm:w-auto"
                                value={filters.month}
                                onChange={handleFilterChange}
                            >
                                <option value="Jan">January</option>
                                <option value="Feb">February</option>
                                <option value="Mar">March</option>
                                <option value="Apr">Apil</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sept">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                        </div>
                        <div className="bg-white p-1 rounded-lg w-full sm:w-auto">
                            <span className="text-[13px]">Sort By: </span>
                            <select
                                name="sortBy"
                                className="p-1 border-0 text-[13px] w-full sm:w-auto "
                                value={filters.sortBy}
                                onChange={handleFilterChange}
                            >

                                <option value="latest" className="text-[13px]">Latest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
                        <div className="bg-white p-1 rounded-lg w-full sm:w-auto">
                            <span className="text-[13px]">Order Type: </span>
                            <select
                                name="orderType"
                                className="p-1 border-0 text-[13px] w-full sm:w-auto"
                                value={filters.orderType}
                                onChange={handleFilterChange}
                            >

                                <option value="all">All</option>
                                <option value="all">All</option>
                            </select>
                        </div>

                        <div className="w-full sm:w-auto">
                            <button className="text-gray-500 flex items-center gap-2 " onClick={handleResetFilters}>
                                <img src={replay} alt="Reset Filter" /> Reset Filter
                            </button>
                        </div>
                    </div>


                    <div className="flex items-center space-x-2 border-r border-gray-300 pr-2">
                        <span className="text-2xl font-bold border-l-[0.5px] border-l-[#8B8989] pl-4">01</span>
                        <span className="text-lg">In process</span>
                        <span className="text-2xl font-bold border-l-[0.5px] border-l-[#8B8989] pl-4">00</span>
                        <span className="text-lg border-r-[0.5px] border-r-[#8B8989] pr-4">Return / Cancel Orders</span>
                    </div>
                </div>
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (filteredOrders.map((order, index) => (
                        <div key={index} className=" bg-white rounded-lg shadow-md p-4 mb-6">
                            <div className="flex flex-wrap justify-between items-center border-b-[0.5px] border-b-[#8B8989] pb-2 mb-4">
                                <div className="text-gray-600 text-[14px]">
                                    Order ID
                                    <span className="font-bold text-gray-800 text-[22px]"> {order._id}</span>
                                </div>
                                <div className={`flex items-center text-[16px] ${order.orderStatus === "Delivered" ? "text-green-600" : "text-blue-600"}`}>
                                    {order.orderStatus === "Delivered" ? (
                                        <img src={delivered} alt="In Transit" className="mr-2" />
                                    ) : (
                                        <img src={inTransit} alt="In Transit" className="mr-2" />
                                    )}
                                    {order.orderStatus}
                                    <span className="text-gray-500 ml-2 text-[14px]">{order.orderStatus === "Delivered" ? "on" : "Arriving on"}{" "} {new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {order.orderItems.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex flex-wrap items-center mb-4">
                                <img
                                    alt={item.name}
                                    className="w-20 h-20 rounded-lg mr-4"
                                    src={item.image[0]}
                                    width="100"
                                    height="100"
                                />
                                <div className="flex-1">
                                    <div className="font-bold text-gray-800 text-[20px]">{item.name}</div>
                                    <div className="text-[#635D5A] text-[16px]">Product ID: {item.product}</div>
                                    <div className="flex items-center mt-2">
                                        <div className="text-[#0F78C1] font-bold text-lg">₹{item.price}</div>
                                        <div className="text-[#635D5A] ml-4 ">Qty: {item.quantity}    Size: {item.size || "N/A"}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {order.orderStatus === "Delivered" ? (
                                        <>
                                            <button className="bg-[#FFF3CE] text-[#5B5454] px-15 py-1 rounded-lg">Exchange</button>
                                            <div className="text-[#635D5A] mt-2 text-[16px]">
                                                Estimated Pickup: <span className="font-bold text-gray-800 text-[16px]">Within 7 Days</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>

                                            <div className="text-blue-500 mt-2 flex justify-center align-center gap-2">
                                                <img src={exchange} alt="Exchange Available" className="mx-auto h-[16px] w-[16px]" />
                                                <div className="flex justify-center align-center">Exchange/Return available for 7 days</div>
                                            </div>

                                        </>
                                    )}
                                </div>
                            </div>
                    ))}


                            <div className="border-t-[0.5px] border-t-[#8B8989] pt-4">
                                <div className="flex flex-wrap items-center space-x-4">
                                    <div className="font-bold text-gray-800 text-[20px]">Billing Address</div>
                                    <div className="flex  flex-wrap space-x-4">
                                        <div className="border-l-[0.5px] border-l-[#8B8989] pl-4">
                                            <div className="font-bold text-gray-800 text-[16px]">{student.name}</div>
                                            <div className="text-[#666666] text-[14px]">{order.address.addressLine1}, {order.address.addressLine2}, {order.address.town}, {order.address.city}, {order.address.state}, {order.address.pincode}</div>
                                        </div>
                                        <div className=" pl-4">
                                            <div className="font-bold text-[#999999] text-[12px]">EMAIL</div>
                                            <div className="text-gray-500 text-[14px]">{order.address.emailId}</div>
                                        </div>
                                        <div className=" pl-4">
                                            <div className="font-bold text-[#999999] text-[12px]">PHONE</div>
                                            <div className="text-gray-500 text-[14px]">{order.address.phoneNumber}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : (
                        <p className="text-gray-600 text-center mt-4">No orders found.</p>
                    )}
                </div>
            </div>
        </div>


    );
};

export default AllOrderDetails;