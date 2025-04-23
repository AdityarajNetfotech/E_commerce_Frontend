import React, { useEffect } from 'react'
import { useState } from "react";
import Sidebar from '../../../Components/SideBar/SideBar'
import Footer from '../../../Components/Footer/Footer';
import icon from '../../../Components/Images/goThrough.png'
import Header from '../Dashboard/header/Header';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ManageStudent() {
    const navigate = useNavigate();
    
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [grades, setGrades] = useState([]); 
    const [selectedGrade, setSelectedGrade] = useState("");
    const studentsPerPage = 4;



    const fetchStudentDetail = async () => {
        try {
            const token = localStorage.getItem("schoolToken");
            if (!token) {
                console.log("Unauthorized: No token found");
                return;
            }

            const response = await axios.get("http://localhost:5000/api/school/students", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Students Data:", response.data.students);
            const allStudents = response.data.students;
            setStudents(allStudents);

            const uniqueGrades = [...new Set(allStudents.map(student => student.grade))];
            setGrades(uniqueGrades);
            
        } catch (error) {
            console.log("Error fetching students:", error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchStudentDetail();
    }, []);



    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.number.toString().includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const handleViewDetails = (student) => {
        navigate("/AllOrders", { state: student });
        console.log("AllOrders:", student);
      };


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
                            <div className="rounded-2xl py-6 px-4 shadow-sm bg-white">
                                <div className='bg-[#FFF3CE] rounded-2xl px-3 py-6'>
                                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search Here..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
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
                                            <select
                                            value={selectedGrade}
                                            onChange={(e) => setSelectedGrade(e.target.value)}
                                            className="px-4 py-2 rounded-lg bg-white text-gray-600"
                                        >
                                            <option value="">All Grades</option>
                                            {grades.map((grade, index) => (
                                                <option key={index} value={grade}>
                                                    {grade}
                                                </option>
                                            ))}
                                        </select>

                                        <button
                                            className="text-blue-600 hover:text-blue-700 cursor-pointer"
                                            onClick={() => {
                                                setSearchQuery("");
                                                setSelectedGrade("");
                                                setCurrentPage(1);
                                            }}
                                        >
                                                <i className="fa-solid fa-rotate-left" />
                                                Reset Filter
                                            </button>

                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold">{filteredStudents.length}</span>
                                                <span className="text-gray-600">Total Students</span>
                                            </div>
                                            <div className="w-px h-6 bg-amber-200" />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full overflow-hidden">
                                    <div className="max-w-full overflow-x-auto">
                                        <table className="w-full min-w-max border-separate border-spacing-y-2">
                                            <thead>
                                                <tr className="bg-[#ECECEC]">
                                                    <th className="text-left py-4 font-medium text-gray-600 pl-2 rounded-l-xl w-[150px]">Student Name</th>
                                                    <th className="text-center py-4 font-medium text-gray-600 w-[200px]">Email Id</th>
                                                    <th className="text-center py-4 font-medium text-gray-600">Mobile No.</th>
                                                    <th className="text-center py-4 font-medium text-gray-600">Grade</th>
                                                    <th className="text-center py-4 font-medium text-gray-600">Gender</th>
                                                    <th className="text-center py-4 font-medium text-gray-600">Last Active</th>
                                                    <th className="text-center py-4 font-medium text-gray-600 pr-2 rounded-r-xl">All Orders</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 space-y-2">
                                                {currentStudents.length > 0 ? (
                                                    currentStudents.map((student, index) => (  
                                                        <tr
                                                            key={index}
                                                            className={`${index % 2 === 0 ? "bg-[#FFFAEA]" : "bg-[#F4F4F4]"}`}
                                                        >
                                                            <td className="py-4 px-2 text-center w-[150px] break-all whitespace-normal rounded-l-xl">
                                                                {student.name
                                                                    .split(" ")
                                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                                    .join(" ")}
                                                            </td>
                                                            <td className="py-4 px-2 text-center w-[200px] break-all whitespace-normal">
                                                                {student.email}
                                                            </td>
                                                            <td className="py-4 text-center">{student.number || "N/A"}</td>
                                                            <td className="py-4 text-center">{student.grade || "N/A"}</td>
                                                            <td className="py-4 text-center">{student.gender || "N/A"}</td>
                                                            <td className="py-4 text-center">{student.lastactive || "N/A"}</td>
                                                            <td className="py-4 text-center rounded-r-xl">
                                                                <button onClick={() => handleViewDetails(student)} className="w-full flex justify-center items-center gap-2 hover:text-blue-600 cursor-pointer border py-1 rounded-lg bg-white text-black">
                                                                    {student.orders.length || 0}
                                                                    <img src={icon} alt="" className="w-5 h-5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7" className="text-center py-4 text-gray-500">
                                                            No matching students found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>

                                        </table>

                                    </div>
                                </div>


                                <div className="flex items-center justify-center mt-6 space-x-4">
                                    <button
                                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-blue-600"}`}
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <i className="fa-solid fa-angle-left" /> Prev
                                    </button>
                                    <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
                                    <button
                                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-blue-600"}`}
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next <i className="fa-solid fa-angle-right" />
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

