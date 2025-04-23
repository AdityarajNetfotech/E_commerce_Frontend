import React, { useState, useEffect } from "react";

const RegisterAdminTable = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
      const [adminToDelete, setAdminToDelete] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await fetch("https://e-commerce-backend-phi-five.vercel.app/api/admin/getAllAdmins");
                if (!response.ok) {
                    throw new Error("Failed to fetch admins");
                }
                const data = await response.json();
                setAdmins(data.admins);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, []);

    const confirmDelete = (id) => {
        setAdminToDelete(id);
        setDeleteConfirmation(true);
      };

    const deleteAdmin = async () => {
        if (!adminToDelete) return;
        try {
            const response = await fetch(`https://e-commerce-backend-phi-five.vercel.app/api/admin/deleteAdmin/${adminToDelete}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete admin");
            }
            setAdmins(admins.filter((admin) => admin._id !== adminToDelete));
            setDeleteConfirmation(false);
      setAdminToDelete(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const filteredAdmins = admins.filter((admin) =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mx-auto bg-[#ECECEC] p-4">
            <div className="p-5 bg-white">
                <div className="mx-auto bg-white">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-md space-y-4">
                        <div className="flex flex-wrap items-center gap-5">
                            <div className="flex items-center space-x-2 bg-white">
                                <input
                                    className="p-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                                    type="text"
                                    placeholder="Search registered admins"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <div className="text-2xl font-semibold">
                                <span className="text-4xl">{filteredAdmins.length}</span> Registered Admins
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
                                        <th className="py-2 px-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAdmins.length > 0 ? (
                                        filteredAdmins.map((admin) => (
                                            <tr key={admin._id} className="bg-gray-100">
                                                <td className="py-2 px-4">{admin.name || "N/A"}</td>
                                                <td className="py-2 px-4">{admin.email || "N/A"}</td>
                                                <td className="py-2 px-4">{admin.mobile || "N/A"}</td>
                                                <td className="py-2 px-4">{admin.address || "N/A"}</td>
                                                <td onClick={() => confirmDelete(admin._id)} className="py-2 px-4">
                                                    <button className="text-red-500">🗑️</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-4 text-center text-gray-500">
                                                No registered admins found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this school?</p>
            <div className="flex justify-center gap-4">
              <button onClick={deleteAdmin} className="px-4 py-2 bg-red-500 text-white rounded-lg">Yes</button>
              <button onClick={() => setDeleteConfirmation(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg">No</button>
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default RegisterAdminTable;
