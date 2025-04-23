import React, { useState, useEffect } from "react";
import Pagination from "../../../Components/Pagination/Pagination";
import search from "../../../Components/Images/SearchOutline.png";

const RegisterSchoolTable = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 3; // Adjust the number of schools per page

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/getAllSchools"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const data = await response.json();
        console.log(data);
        
        const approvedSchools = data.schools.filter(
          (school) => school.isApproved
        );
        setSchools(approvedSchools);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  const confirmDelete = (id) => {
    setSchoolToDelete(id);
    setDeleteConfirmation(true);
  };

  const deleteSchool = async () => {
    if (!schoolToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/deleteSchool/${schoolToDelete}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete school");
      }
      setSchools(schools.filter((school) => school._id !== schoolToDelete));
      setDeleteConfirmation(false);
      setSchoolToDelete(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const downloadCertificate = async () => {
    if (!selectedCertificate) return;

    try {
      const response = await fetch(selectedCertificate, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Affiliation_Certificate.jpg";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.affiliationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // **Pagination Logic**
  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = filteredSchools.slice(
    indexOfFirstSchool,
    indexOfLastSchool
  );
  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);

  return (
    <div className="mx-auto bg-[#ECECEC] p-4">
      <div className="p-5 bg-white">
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md space-y-4">
            <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center space-x-2 bg-white">
            <input
              className="p-2 rounded-lg border-0 focus:outline-none focus:ring-3 focus:ring-yellow-500 w-full sm:w-auto"
              type="text"
              placeholder="Search registered schools"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
             <button className="text-yellow-500 p-1">
              <img src={search} alt="Search" />
            </button>
          </div>
              </div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-2xl font-semibold">
              <span className="text-4xl">{filteredSchools.length}</span>{" "}
              Registered Schools
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
                  <th className="py-2 px-4 text-left">State</th>
                  <th className="py-2 px-4 text-left">Address</th>
                  <th className="py-2 px-4 text-left">Affiliation Number</th>
                  <th className="py-2 px-4 text-left">
                    Affiliation Certificate
                  </th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSchools.length > 0 ? (
                  currentSchools.map((school) => (
                    <tr key={school._id} className="bg-gray-100">
                      <td className="py-2 px-4">{school.name || "N/A"}</td>
                      <td className="py-2 px-4">{school.email || "N/A"}</td>
                      <td className="py-2 px-4">{school.mobile || "N/A"}</td>
                      <td className="py-2 px-4">{school.state || "N/A"}</td>
                      <td className="py-2 px-4">{school.address || "N/A"}</td>
                      <td className="py-2 px-4">
                        {school.affiliationNumber || "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {school.affiliationCertificate ? (
                          <button
                            onClick={() => {
                              setSelectedCertificate(
                                school.affiliationCertificate
                              );
                              document.body.classList.add("overflow-hidden");
                            }}
                            className="text-blue-500 underline"
                          >
                            View Certificate
                          </button>
                        ) : (
                          "Not Available"
                        )}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => confirmDelete(school._id)}
                          className="text-red-500"
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

        {/* **Pagination Component** */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Certificate Modal Popup */}
      {selectedCertificate && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-0 backdrop-blur-md">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              Affiliation Certificate
            </h2>
            <div className="flex justify-center">
              <img
                src={selectedCertificate}
                alt="Certificate"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={downloadCertificate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                📥 Download
              </button>
              <button
                onClick={() => {
                  setSelectedCertificate(null);
                  document.body.classList.remove("overflow-hidden");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

{deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this school?</p>
            <div className="flex justify-center gap-4">
              <button onClick={deleteSchool} className="px-4 py-2 bg-red-500 text-white rounded-lg">Yes</button>
              <button onClick={() => setDeleteConfirmation(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterSchoolTable;
