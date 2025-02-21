import React, { useState, useEffect } from "react";
import Prev from "../../../Components/Images/PrevArrow.png";
import Next from "../../../Components/Images/NextArrow.png";
import search from "../../../Components/Images/SearchOutline.png";

const PendingSchoolsTable = () => {
    const [pendingSchools, setPendingSchools] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState({}); 
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchPendingSchools = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("adminAuthToken"); 
                console.log("Token is:", token);

                const response = await fetch("http://localhost:5000/api/admin/pending-schools", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log("Response Object:", response);

                if (!response.ok) {
                    throw new Error("Failed to fetch pending schools");
                }

                const data = await response.json();
                setPendingSchools(data);

                // Initialize status state for each school
                const initialStatus = {};
                data.forEach((school) => {
                    initialStatus[school._id] = "Not Accepted"; // Default value
                });
                setStatus(initialStatus);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingSchools();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = async (schoolId, newStatus) => {
        setStatus((prevStatus) => ({
            ...prevStatus,
            [schoolId]: newStatus,
        }));

        if (newStatus === "Accepted") {
            try {
                const token = localStorage.getItem("adminAuthToken");
                const response = await fetch(`http://localhost:5000/api/admin/approve-school/${schoolId}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to approve the school");
                }

                const data = await response.json();
                console.log("School approved successfully:", data);
            alert("School approved successfully!");
            } catch (error) {
                console.error("Error approving school:", error.message);
            }
        } else {
            console.log(`School ${schoolId} status changed to: ${newStatus}`);
        }
    };

    const filteredSchools = pendingSchools.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedSchools = filteredSchools.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="mx-auto bg-[#ECECEC] p-4">
            <div className="p-5 bg-white">
                <div className="mx-auto bg-white">
                    <div className="bg-yellow-100 p-4 rounded-lg shadow-md space-y-4">
                        <div className="flex flex-wrap items-center gap-5">
                            <div className="flex items-center space-x-2 bg-white">
                                <input
                                    className="p-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
                                    type="text"
                                    placeholder="Search pending schools"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button className="text-yellow-500 p-2">
                                    <img src={search} alt="Search" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <div className="text-2xl font-semibold">
                                <span className="text-4xl">{filteredSchools.length}</span> Pending Schools
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500 mt-4">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 mt-4">{error}</p>
                    ) : (
                        <>
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
                                            <th className="py-2 px-4 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedSchools.length > 0 ? (
                                            paginatedSchools.map((school) => (
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
                                                    <td className="py-2 px-4">
                                                        <select
                                                            className="border p-2 rounded"
                                                            value={status[school._id]}
                                                            onChange={(e) => handleStatusChange(school._id, e.target.value)}
                                                        >
                                                            <option value="Not Accepted">Not Accepted</option>
                                                            <option value="Accepted">Accepted</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="py-4 text-center text-gray-500">
                                                    No pending schools found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-4 justify-center">
                                <button
                                    className="text-gray-500 flex items-center gap-2"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <img src={Prev} alt="Previous" className="w-4 h-4" />
                                    <span>Prev</span>
                                </button>
                                <div>
                                    Page {currentPage} of {Math.max(1, Math.ceil(filteredSchools.length / itemsPerPage))}
                                </div>
                                <button
                                    className="text-gray-500 flex items-center gap-2"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, Math.ceil(filteredSchools.length / itemsPerPage))
                                        )
                                    }
                                    disabled={currentPage >= Math.ceil(filteredSchools.length / itemsPerPage)}
                                >
                                    <span>Next</span>
                                    <img src={Next} alt="Next" className="w-4 h-4" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingSchoolsTable;
