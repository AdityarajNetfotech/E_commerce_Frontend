import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    isWithinInterval, startOfWeek, endOfWeek,
    startOfMonth, endOfMonth, startOfYear, endOfYear
} from 'date-fns';
import primaryIcon from "../../Images/PrimaryIcon.png";
import { useNavigate } from "react-router-dom";

function DashboardScreen() {
    const [selectedTimeframe, setSelectedTimeframe] = useState("weekly");
    const [chartData, setChartData] = useState([]);
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [inTransitOrders, setInTransitOrders] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);

    const navigate = useNavigate();

    const toTitleCase = (str) =>
        str.replace(/\w\S*/g, (txt) =>
            txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        );

    const normalizeState = (state) =>
        state?.trim().toLowerCase().replace(/\s+/g, " ") || "";

    const getTimeRange = (timeframe) => {
        const now = new Date();
        if (timeframe === "weekly") {
            return {
                start: startOfWeek(now, { weekStartsOn: 1 }),
                end: endOfWeek(now, { weekStartsOn: 1 })
            };
        } else if (timeframe === "monthly") {
            return {
                start: startOfMonth(now),
                end: endOfMonth(now)
            };
        } else {
            return {
                start: startOfYear(now),
                end: endOfYear(now)
            };
        }
    };

    const groupSchoolsByStateAndTimeframe = (schools, timeframe) => {
        const { start, end } = getTimeRange(timeframe);
        const result = {};

        schools.forEach((school) => {
            const state = normalizeState(school.state);
            const createdAt = school.createdAt ? new Date(school.createdAt) : null;
            if (!createdAt) return;

            if (isWithinInterval(createdAt, { start, end })) {
                result[state] = (result[state] || 0) + 1;
            }
        });

        return Object.entries(result).map(([state, count]) => ({
            name: toTitleCase(state),
            uv: count,
        }));
    };

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch("https://e-commerce-backend-phi-five.vercel.app/api/admin/getAllSchools");
                if (!response.ok) throw new Error("Failed to fetch schools");
                const data = await response.json();
                const approvedSchools = data.schools.filter(s => s.isApproved);
                setSchools(approvedSchools);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchOrderData = async () => {
            try {
                const res = await fetch("https://e-commerce-backend-phi-five.vercel.app/api/admin/all");
                const data = await res.json();
                const orders = data.orders || [];

                let revenue = 0, completed = 0, processing = 0;
                orders.forEach((order) => {
                    revenue += order.totalAmount || 0;
                    if (order.orderStatus === "Delivered") completed += 1;
                    else if (order.orderStatus === "Processing") processing += 1;
                });

                setTotalRevenue(revenue);
                setCompletedOrders(completed);
                setInTransitOrders(processing);
            } catch (err) {
                console.error("Error fetching order data:", err);
            }
        };

        const fetchStudentData = async () => {
            try {
                const res = await fetch("https://e-commerce-backend-phi-five.vercel.app/api/admin/getAllStudents");
                const data = await res.json();
                setTotalStudents(data.students?.length || 0);
            } catch (err) {
                console.error("Error fetching students:", err);
            }
        };

        fetchSchools();
        fetchOrderData();
        fetchStudentData();
    }, []);

    useEffect(() => {
        const updatedData = groupSchoolsByStateAndTimeframe(schools, selectedTimeframe);
        setChartData(updatedData);
    }, [selectedTimeframe, schools]);

    const handleButtonClick = (timeframe) => {
        setSelectedTimeframe(timeframe);
    };

    const visibleSchools = schools.slice(0, 4);

    return (
        <div className="mx-auto bg-[#ECECEC] p-4">
            <div className="p-5 bg-white">

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">
                        <div className="bg-white p-1 text-center font-bold">TOTAL ORDERS</div>
                        <div className="flex justify-between">
                            <p className="text-[20px] sm:text-[28px] font-bold">₹ {totalRevenue.toFixed(2)}</p>
                            <p className="text-[12px] sm:text-[14px]">
                                <span className="text-[24px]">↑ </span>34.7%
                            </p>
                        </div>
                        <p className="text-[12px] text-right text-[#04103B]">Compared to Jan 2023</p>
                    </div>

                    <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">
                        <div className="bg-white p-1 text-center font-bold">ORDER STATUS</div>
                        <div className="flex justify-between items-center mt-6">
                            <p className="text-[20px] sm:text-[28px] font-bold">
                                {completedOrders} <span className="text-[#4E4949] text-[16px] font-light">Complete</span>
                            </p>
                            <p className="text-[20px] sm:text-[28px] font-bold">
                                {inTransitOrders} <span className="text-[#4E4949] text-[16px] font-light">In Transit</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">
                        <div className="bg-white p-1 text-center font-bold">TOTAL USERS</div>
                        <div className="flex justify-between items-center mt-6">
                            <p className="text-[20px] sm:text-[28px] font-bold">
                                {totalStudents} <span className="text-[#4E4949] text-[16px] font-light">Students</span>
                            </p>
                            <p className="text-[20px] sm:text-[28px] font-bold">
                                {schools.length} <span className="text-[#4E4949] text-[16px] font-light">Schools</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chart & Schools */}
                <div className="flex md:flex-row flex-col justify-between gap-6 mt-5">
                    <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md w-full md:w-[70%]">
                        <div className="flex flex-col md:flex-row justify-between border-b border-[#8B8989]">
                            <div className="text-lg font-bold mb-2">Registered Schools by State</div>
                            <div className="flex gap-2 mb-2">
                                {["weekly", "monthly", "yearly"].map((label) => (
                                    <button
                                        key={label}
                                        className={`border px-2 py-1 rounded-lg font-semibold hover:bg-black hover:text-white ${selectedTimeframe === label ? "bg-black text-white" : "text-[#5B5454]"}`}
                                        onClick={() => handleButtonClick(label)}
                                    >
                                        {label.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData}>
                                <XAxis dataKey="name" fontSize={12} tickLine={false} />
                                <YAxis />
                                <Tooltip formatter={(value) => [`${value}`, "Schools"]} />
                                <Line type="monotone" dataKey="uv" stroke="#FFA500" strokeWidth={2} dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md md:w-[30%]">
                        <div className="text-[20px] text-[#1D1F2C] border-b border-[#8B8989] font-bold">
                            Registered Schools
                        </div>
                        {loading ? (
                            <p className="text-center text-gray-600">Loading...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
                        ) : (
                            <>
                                {visibleSchools.map((school, index) => (
                                    <div key={index} className="mx-auto mt-6">
                                        <div className="flex justify-between gap-10">
                                            <div>
                                                <p className="text-[13px] font-bold">{school.name}</p>
                                                <p className="text-[14px] font-light text-[#4E4949]">{school.address}</p>
                                            </div>
                                            <img src={primaryIcon} className="w-8 h-8 object-cover" alt="school" />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg mx-auto block mt-5"
                                    onClick={() => navigate("/RegisterSchool")}
                                >
                                    VIEW ALL
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardScreen;
