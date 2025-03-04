import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import SidebarButtons from "../../../Components/button/Button";
import Header from "../MyOrders/header/OrderHeader";

function AccountDetails() {
  const accountdetail = "Account Detail";

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    number: "",
    grade: "",
    gender: "",
  });

  const token = localStorage.getItem("authToken");

  const fetchStudentDetails = async () => {
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/student/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      let student = response.data.student || response.data;

      if (!student || typeof student !== "object") {
        throw new Error("Invalid API response");
      }

      setStudentData({
        name: student.name || "",
        email: student.email || "", // Email should remain static
        number: student.number || "",
        grade: student.grade || "",
        gender: student.gender || "",
      });
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      setError("Failed to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const handleInputChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/student/update",
        { ...studentData, email: undefined }, // Remove email from update payload
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      console.log("Student details updated:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating student details:", error.response ? error.response.data : error.message);
      setError("Failed to update student details.");
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <CustomNavbar />
      <Header heading={accountdetail} />

      <section className="flex flex-col lg:flex-row justify-center items-stretch bg-[#ECECEC] min-h-screen p-15 gap-0">
        <SidebarButtons />
        <div className="w-full lg:w-[750px] bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-[22px] font-bold mb-4">Account Details</h2>
          <hr className="mb-6" />

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email", disabled: true }, // Email is always disabled
              { label: "Mobile Number", name: "number", type: "tel" },
              { label: "Grade", name: "grade", type: "text" },
              { label: "Gender", name: "gender", type: "text" },
            ].map(({ label, name, type, disabled }) => (
              <div key={name}>
                <label className="block text-md font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={studentData[name]}
                  onChange={handleInputChange}
                  disabled={disabled || !isEditing} // Email stays disabled even in edit mode
                  className="w-full border rounded-md px-3 p-3 focus:ring-2 focus:ring-orange-400 outline-none focus:border-none disabled:bg-white"
                />
              </div>
            ))}

            <div className="md:col-span-2 flex gap-4 p-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-[#FF902A] hover:bg-orange-600 text-white font-semibold p-3 rounded-md transition"
                >
                  Edit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-md transition"
                >
                  Save
                </button>
              )}

              <button
                type="button"
                className="w-full bg-black hover:bg-gray-600 text-white font-semibold py-2 rounded-md transition"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AccountDetails;
