import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import primaryIcon from "../../Images/PrimaryIcon.png";
import { useNavigate } from "react-router-dom";




const weeklyData = [
    { name: "MON", uv: 200 },
    { name: "TUE", uv: 500 },
    { name: "WED", uv: 300 },
    { name: "THU", uv: 400 },
    { name: "FRI", uv: 600 },
    { name: "SAT", uv: 700 },
    { name: "SUN", uv: 800 },
];

const monthlyData = [
    { name: "JAN", uv: 5000 },
    { name: "FEB", uv: 7000 },
    { name: "MAR", uv: 6000 },
    { name: "APR", uv: 8000 },
    { name: "MAY", uv: 7500 },
    { name: "JUN", uv: 9500 },
    { name: "JUL", uv: 10000 },
    { name: "AUG", uv: 8500 },
    { name: "SEP", uv: 11000 },
    { name: "OCT", uv: 12000 },
    { name: "NOV", uv: 10500 },
    { name: "DEC", uv: 13000 },
];

const yearlyData = [
    { name: "2018", uv: 5000 },
    { name: "2019", uv: 7000 },
    { name: "2020", uv: 6000 },
    { name: "2021", uv: 8000 },
    { name: "2022", uv: 7500 },
    { name: "2023", uv: 9500 },
    { name: "2024", uv: 10000 },
    { name: "2025", uv: 8500 },
];




function DashboardScreen() {

    const [selectedTimeframe, setSelectedTimeframe] = useState("weekly");
    const [chartData, setChartData] = useState(weeklyData);

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

    const handleButtonClick = (timeframe) => {
        setSelectedTimeframe(timeframe);
        if (timeframe === "weekly") setChartData(weeklyData);
        if (timeframe === "monthly") setChartData(monthlyData);
        if (timeframe === "yearly") setChartData(yearlyData);
    };

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/admin/getAllSchools");
                if (!response.ok) {
                    throw new Error("Failed to fetch schools");
                }
                const data = await response.json();
                const approvedSchools = data.schools.filter((school) => school.isApproved);
                setSchools(approvedSchools);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSchools();
    }, []);

    const visibleSchools = schools.slice(0, 4);



    return (


        <div className="mx-auto bg-[#ECECEC] p-4">
            <div className="p-5 bg-white">
                <div className="mx-auto bg-white">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">
                            <div className="bg-white p-1 text-center font-bold">TOTAL ORDERS</div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-[20px] sm:text-[28px] font-bold">₹ 126.50k</p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <p className="text-[12px] sm:text-[14px]">
                                        <span className="text-[24px]">↑ </span>34.7%
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-[12px] sm:text-[12px] text-[#04103B]">
                                    Compared to Jan 2023
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">
                            <div className="bg-white p-1 text-center font-bold">ORDER STATUS</div>
                            <div className="flex justify-between items-center mt-6">
                                <div>
                                    <p className="text-[20px] sm:text-[28px] font-bold">
                                        100 <span className="text-[#4E4949] text-[16px] font-light">Complete</span>
                                    </p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <p className="text-[20px] sm:text-[28px] font-bold">
                                        20 <span className="text-[#4E4949] text-[16px] font-light">In Transit</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#FFF3CE] p-4 rounded-lg shadow-md space-y-4">
                            <div className="bg-white p-1 text-center font-bold">TOTAL USERS</div>
                            <div className="flex justify-between items-center mt-6">
                                <div>
                                    <p className="text-[20px] sm:text-[28px] font-bold">
                                        100 <span className="text-[#4E4949] text-[16px] font-light">Students</span>
                                    </p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <p className="text-[20px] sm:text-[28px] font-bold">
                                        {schools.length} <span className="text-[#4E4949] text-[16px] font-light">Schools</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex md:flex-row flex-col justify-between gap-6 mt-5 ">

                        <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-2">
                            <div className="flex flex-col md:flex-row justify-between border-b border-[#8B8989]">
                                <div>Sale Graph</div>
                                <div className="flex gap-2 justify-between mb-2">

                                    <button
                                        className={`border-1 px-2 py-1 rounded-lg font-semibold hover:bg-black hover:text-white ${selectedTimeframe === "weekly" ? "bg-black text-white" : "text-[#5B5454]"
                                            }`}
                                        onClick={() => handleButtonClick("weekly")}
                                    >
                                        WEEKLY
                                    </button>

                                    <button
                                        className={`border-1 px-2 py-1 rounded-lg font-semibold hover:bg-black hover:text-white ${selectedTimeframe === "monthly" ? "bg-black text-white" : "text-[#5B5454]"
                                            }`}
                                        onClick={() => handleButtonClick("monthly")}
                                    >
                                        MONTHLY
                                    </button>

                                    <button
                                        className={`border-1 px-2 py-1 rounded-lg font-semibold hover:bg-black hover:text-white ${selectedTimeframe === "yearly" ? "bg-black text-white" : "text-[#5B5454]"
                                            }`}
                                        onClick={() => handleButtonClick("yearly")}
                                    >
                                        YEARLY
                                    </button>
                                </div>
                            </div>


                            <div className="w-full overflow-x-auto">
                                <LineChart width={chartSize.width} height={chartSize.height} data={chartData}>
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={true} />
                                    <YAxis />
                                    <Line type="monotone" dataKey="uv" stroke="#FFA500" strokeWidth={2} dot={false} />
                                </LineChart>
                            </div>
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
                                        <div key={index} className="mx-auto mt-8">
                                            <div className="flex flex-row justify-between gap-10">
                                                <div className="flex gap-2">
                                                    <div>
                                                        <p className="text-[13px] font-bold">{school.name}</p>
                                                        <p className="text-[14px] font-light text-[#4E4949]">
                                                        {school.address}
                                                        </p>
                                                    </div>
                                                </div>
                                                <img src={primaryIcon} className="w-8 h-8 object-cover" />
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
        </div>

    )
}

export default DashboardScreen
