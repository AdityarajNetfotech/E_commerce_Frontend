import React, { useState, useEffect } from "react";
import search from "../../../Components/Images/SearchOutline.png";
import Pagination from "../../../Components/Pagination/Pagination";

const RegisterStudentTable = () => {
    const [students, setStudents] = useState([]);
    const [schools, setSchools] = useState({});
    const [schoolsList, setSchoolsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsRes, schoolsRes] = await Promise.all([
                    fetch("http://localhost:5000/api/admin/getAllStudents"),
                    fetch("http://localhost:5000/api/admin/getAllSchools")
                ]);

                if (!studentsRes.ok || !schoolsRes.ok) {
                    throw new Error("Failed to fetch data");
                }

                const studentsData = await studentsRes.json();
                const schoolsData = await schoolsRes.json();

                console.log("StuD", studentsData);
                console.log("SchD", schoolsData);

                setStudents(studentsData.students);

                // school id to school name mapping
                const schoolMap = {};
                schoolsData.schools.forEach(school => {
                    schoolMap[school._id] = school.name;
                });

                setSchools(schoolMap);

                // Get unique school IDs from registered students
                const uniqueSchoolIds = [...new Set(studentsData.students.map(student => student.school))];

                // Filter schools list to include only those that have registered students
                const filteredSchools = schoolsData.schools.filter(school =>
                    uniqueSchoolIds.includes(school._id)
                );

                setSchoolsList(filteredSchools);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const confirmDelete = (id) => {
        setStudentToDelete(id);
        setDeleteConfirmation(true);
    };

    const deleteStudent = async () => {
        if (!studentToDelete) return;
        try {
            const response = await fetch(`http://localhost:5000/api/admin/deleteStudent/${studentToDelete}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete student");
            }
            setStudents(students.filter((student) => student._id !== studentToDelete));
            setDeleteConfirmation(false);
            setStudentToDelete(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSchoolChange = (e) => {
        setSelectedSchool(e.target.value);
    };

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSchool =
            selectedSchool === "" || student.school === selectedSchool;

        return matchesSearch && matchesSchool;
    });

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(
        indexOfFirstStudent,
        indexOfLastStudent
    );
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    return (
        <div className="mx-auto bg-[#ECECEC] p-4">
            <div className="p-5 bg-white">
                <div className="mx-auto bg-white">
                    <div className="bg-yellow-100 p-4 rounded-lg shadow-md space-y-4">
                        <div className="flex items-center gap-10">
                            <div className="flex items-center space-x-2 bg-white w-[250px]">
                                <input
                                    className="p-2 rounded-lg border-0 focus:outline-none focus:ring-3 focus:ring-yellow-500 w-full sm:w-auto"
                                    type="text"
                                    placeholder="Search registered students"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="text-yellow-500 p-1">
                                    <img src={search} alt="Search" />
                                </button>
                            </div>

                            <div>
                                <select
                                    className="p-2 rounded-lg border focus:outline-none focus:ring-3 focus:ring-yellow-500"
                                    value={selectedSchool}
                                    onChange={handleSchoolChange}
                                >
                                    <option value="">All Schools</option>
                                    {schoolsList.map(school => (
                                        <option key={school._id} value={school._id}>
                                            {school.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <div className="text-2xl font-semibold">
                                <span className="text-4xl">{filteredStudents.length}</span> Registered Students
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500 mt-4">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 mt-4">{error}</p>
                    ) : (
                        <div className="mt-4 bg-white rounded-lg overflow-x-auto">
                            <table className="min-w-full border-spacing-y-3 border-separate">
                                <thead className="bg-[#F4F4F4]">
                                    <tr>
                                        <th className="py-2 px-4 text-left">Name</th>
                                        <th className="py-2 px-4 text-left">Email</th>
                                        <th className="py-2 px-4 text-left">School</th>
                                        <th className="py-2 px-4 text-left">Verified</th>
                                        <th className="py-2 px-4 text-left">Created At</th>
                                        <th className="py-2 px-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentStudents.length > 0 ? (
                                        currentStudents.map((student) => (
                                            <tr key={student._id} className="bg-gray-100">
                                                <td className="py-2 px-4">{student.name || "N/A"}</td>
                                                <td className="py-2 px-4">{student.email || "N/A"}</td>
                                                <td className="py-2 px-4">{schools[student.school] || "N/A"}</td>
                                                <td className="py-2 px-4">{student.isVerified ? "Yes" : "No"}</td>
                                                <td className="py-2 px-4">{new Date(student.createdAt).toLocaleDateString()}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() => confirmDelete(student._id)}
                                                        className="text-red-500"
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-4 text-center text-gray-500">
                                                No registered students found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
                {deleteConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full text-center">
                            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this student?</p>
                            <div className="flex justify-center gap-4">
                                <button onClick={deleteStudent} className="px-4 py-2 bg-red-500 text-white rounded-lg">Yes</button>
                                <button onClick={() => setDeleteConfirmation(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg">No</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterStudentTable;