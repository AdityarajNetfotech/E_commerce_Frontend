import React, { useState, useEffect } from "react";

const RegisterStudentTable = () => {
    const [students, setStudents] = useState([]);
    const [schools, setSchools] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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

                setStudents(studentsData.students);

                // school id to school name....
                const schoolMap = {};
                schoolsData.schools.forEach(school => {
                    schoolMap[school._id] = school.name;
                });

                setSchools(schoolMap);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const deleteStudent = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/deleteStudent/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete student");
            }
            setStudents(students.filter(student => student._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mx-auto bg-[#ECECEC] p-4">
            <div className="p-5 bg-white">
                <div className="mx-auto bg-white">
                    <div className="bg-yellow-100 p-4 rounded-lg shadow-md space-y-4">
                        <div className="flex flex-wrap items-center gap-5">
                            <input
                                className="p-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
                                type="text"
                                placeholder="Search registered students"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student) => (
                                            <tr key={student._id} className="bg-gray-100">
                                                <td className="py-2 px-4">{student.name || "N/A"}</td>
                                                <td className="py-2 px-4">{student.email || "N/A"}</td>
                                                <td className="py-2 px-4">{schools[student.school] || "N/A"}</td>
                                                <td className="py-2 px-4">{student.isVerified ? "Yes" : "No"}</td>
                                                <td className="py-2 px-4">{new Date(student.createdAt).toLocaleDateString()}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() => deleteStudent(student._id)}
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
                </div>
            </div>
        </div>
    );
};

export default RegisterStudentTable;
