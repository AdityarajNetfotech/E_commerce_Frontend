import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import axios from 'axios';


function DashboardScreen() {

    const [orders, setOrders] = useState([]);
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        completedOrders: 0,
        inTransitOrders: 0,
        totalStudents: 0,
        mostSellingProducts: [],
    });

    const [selectedTimeframe, setSelectedTimeframe] = useState("weekly");
    const [chartData, setChartData] = useState([]);


    const [chartSize, setChartSize] = useState({
        width: window.innerWidth < 1025 ? 300 : 600,
        height: window.innerWidth < 1025 ? 300 : 400,
    });


    useEffect(() => {
        const handleResize = () => {
            setChartSize({
                width: window.innerWidth < 1025 ? 300 : 600,
                height: window.innerWidth < 1025 ? 300 : 400,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchOrders();
        fetchStudents();
    }, [selectedTimeframe]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("schoolToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("https://e-commerce-backend-phi-five.vercel.app/api/order/school-orders/", config);
            const fetchedOrders = res.data || [];

            setOrders(fetchedOrders);
            console.log("fetchedOrders:", fetchedOrders);


            
            const totalOrders = fetchedOrders.length;
            const totalRevenue = fetchedOrders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
            const completedOrders = fetchedOrders.filter(order => order.orderStatus === "Delivered").length;
            const inTransitOrders = fetchedOrders.filter(order =>
                ["Processing", "Shipped"].includes(order.orderStatus)).length;

            
            const productMap = {};

            for (const order of fetchedOrders) {
                for (const item of order.orderItems) {
                   
                    const key = item.product?._id?.toString();
                    if (!productMap[key]) {
                        productMap[key] = {
                            name: item.name,
                            quantity: 0,
                            price: item.price,
                            image: item.product?.image?.[0] || "",
                        };
                    }
                    productMap[key].quantity += item.quantity;
                }
            }
            console.log("Unique products found in all orders:", Object.keys(productMap).length);
            const mostSellingProducts = Object.values(productMap)
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 4);

            setStats(prev => ({
                ...prev,
                totalOrders,
                totalRevenue,
                completedOrders,
                inTransitOrders,
                mostSellingProducts,
            }));

            generateChartData(fetchedOrders, selectedTimeframe);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem("schoolToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await axios.get("https://e-commerce-backend-phi-five.vercel.app/api/school/students", config);
            const fetchedStudents = res.data.students || [];
            console.log("num", fetchedStudents.length);
            setStudents(fetchedStudents);

            setStats(prev => ({
                ...prev,
                totalStudents: fetchedStudents.length,
            }));
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    const generateChartData = (orders, timeframe) => {
        const dateCounts = {};
        for (let order of orders) {
            const createdAt = new Date(order.createdAt);
            let label;

            if (timeframe === "weekly") {
                label = createdAt.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
            } else if (timeframe === "monthly") {
                label = createdAt.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
            } else if (timeframe === "yearly") {
                label = createdAt.getFullYear().toString();
            }

            if (!dateCounts[label]) dateCounts[label] = 0;
            dateCounts[label] += order.totalAmount;
        }

        const orderedLabels = timeframe === "weekly"
            ? ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
            : timeframe === "monthly"
                ? ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
                : Object.keys(dateCounts).sort();

        const formatted = orderedLabels.map(label => ({
            name: label,
            uv: dateCounts[label] || 0,
        }));

        setChartData(formatted);
    };

    const handleButtonClick = (timeframe) => {
        setSelectedTimeframe(timeframe);
    };


    return (


        <div className="mx-auto bg-[#ECECEC] p-4">
            <div className="p-5 bg-white">
                <div className="mx-auto bg-white">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">
                            <div className="bg-white p-1 text-center font-bold">TOTAL ORDERS</div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-[20px] sm:text-[28px] font-bold">₹ {stats.totalRevenue.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-[20px] sm:text-[28px] font-bold">{stats.totalOrders} <span className="text-[#4E4949] text-[16px] font-light">Orders</span></p>
                                </div>
                            </div>
                            
                        </div>

                        <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">
                            <div className="bg-white p-1 text-center font-bold">ORDER STATUS</div>
                            <div className="flex justify-between items-center mt-6">
                                <div>
                                    <p className="text-[20px] sm:text-[28px] font-bold">
                                        {stats.completedOrders} <span className="text-[#4E4949] text-[16px] font-light">Complete</span>
                                    </p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <p className="text-[20px] sm:text-[28px] font-bold">
                                        {stats.inTransitOrders} <span className="text-[#4E4949] text-[16px] font-light">In Transit</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">
                            <div className="bg-white p-1 text-center font-bold">TOTAL STUDENTS</div>
                            <div className="text-center flex justify-center mt-6">
                                <p className="text-[20px] sm:text-[28px] font-bold">
                                    {stats.totalStudents} <span className="text-[#4E4949] text-[16px] font-light">Students</span>
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="flex md:flex-row flex-col justify-between gap-6 mt-5 ">

                        <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-2">
                            <div className="flex flex-col md:flex-row justify-between border-b border-[#8B8989]">
                                <div>Sale Graph</div>
                                <div className="flex gap-2 justify-between mb-2">

                                    {["weekly", "monthly", "yearly"].map((tf) => (
                                        <button
                                            key={tf}
                                            className={`border-1 px-2 py-1 rounded-lg font-semibold hover:bg-black hover:text-white ${selectedTimeframe === tf ? "bg-black text-white" : "text-[#5B5454]"
                                                }`}
                                            onClick={() => handleButtonClick(tf)}
                                        >
                                            {tf.toUpperCase()}
                                        </button>
                                    ))}

                                </div>
                            </div>

                            <div className="w-full overflow-x-auto">
                                <ResponsiveContainer width="100%" height={chartSize.height}>
                                    <LineChart data={chartData} margin={{ left: 40, }}>
                                        <XAxis dataKey="name" fontSize={12} tickLine={false} />
                                        <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
                                            formatter={(value) => [`₹ ${value.toLocaleString()}`, "Revenue"]}
                                        />
                                        <Line type="monotone" dataKey="uv" stroke="#FFA500" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                        </div>


                        <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md">
                            <div className="text-[20px] text-[#1D1F2C] border-b border-[#8B8989]">
                                Most Selling Products
                            </div>
                            {stats.mostSellingProducts.map((item, index) => (
                                <div key={index} className="mx-auto mt-8">
                                    <div className="flex flex-col md:flex-row justify-between gap-4 [@media(width:1024px)]:flex-row [@media(width:1024px)]:gap-6">
                                        <div className="flex gap-2">
                                            <img src={item.image} className="w-16 h-16 object-cover" />
                                            <div>
                                                <p className="text-[15px] font-bold">{item.name}</p>
                                                <p className="text-[14px] font-light text-[#4E4949]">{item.quantity} Sales</p>
                                            </div>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <p className="text-[16px] font-bold">₹ {item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}


                            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mx-auto block mt-5">
                                <Link to="/add-product">Add New Product +</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DashboardScreen
