import React, { useState, useEffect } from "react";

const RegisterSchoolTable = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/admin/getAllSchools");
                if (!response.ok) {
                    throw new Error("Failed to fetch schools");
                }
                const data = await response.json();
                const approvedSchools = data.schools.filter(school => school.isApproved);
                setSchools(approvedSchools);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSchools();
    }, []);

    const deleteSchool = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/deleteSchool/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete school");
            }
            setSchools(schools.filter(school => school._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const filteredSchools = schools.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mx-auto bg-[#ECECEC] p-4">
         <div className="p-5 bg-white">
            <div className="mx-auto bg-white">
             <div className="bg-yellow-100 p-4 rounded-lg shadow-md space-y-4">
                <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-center space-x-2 bg-white">
                        <input className="p-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
                            type="text"
                            placeholder="Search registered schools"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                    </div>
                </div>

            <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="text-2xl font-semibold">
                        <span className="text-4xl">{filteredSchools.length}</span> Registered Schools
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
                                        <th className="py-2 px-4 text-left">Mobile</th>
                                        <th className="py-2 px-4 text-left">Address</th>
                                        <th className="py-2 px-4 text-left">Affiliation Number</th>
                                        <th className="py-2 px-4 text-left">Affiliation Certificate</th>
                                        <th className="py-2 px-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSchools.length > 0 ? (
                                        filteredSchools.map((school) => (
                                            <tr key={school._id} className="bg-gray-100">
                                                <td className="py-2 px-4">{school.name || "N/A"}</td>
                                                <td className="py-2 px-4">{school.email || "N/A"}</td>
                                                <td className="py-2 px-4">{school.mobile || "N/A"}</td>
                                                <td className="py-2 px-4">{school.address || "N/A"}</td>
                                                <td className="py-2 px-4">{school.affiliationNumber || "N/A"}</td>
                                                <td className="py-2 px-4">
                                                    {school.affiliationCertificate ? (
                                                        <a
                                                            href={school.affiliationCertificate}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline"
                                                        >
                                                            View Certificate
                                                        </a>
                                                    ) : (
                                                        "Not Available"
                                                    )}
                                                </td>
                                                <td onClick={() => deleteSchool(school._id)}
                                                className="py-2 px-4">
                                                    <button
                                                        
                                                        className="text-red-500 "
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="py-4 text-center text-gray-500">
                                                No registered schools found.
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

export default RegisterSchoolTable;
