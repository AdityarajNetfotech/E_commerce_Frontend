import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountDetailsForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // ✅ State to trigger re-fetch
  const [formData, setFormData] = useState({
    schoolName: "",
    email: "",
    mobileNumber: "",
    affiliationNumber: "",
    affiliationCertificate: null,
  });

  const token = localStorage.getItem("schoolToken");

 
  const fetchSchoolDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/school/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.schoolDetails) {
        const school = response.data.schoolDetails;
        setFormData({
          schoolName: school.name || "",
          email: school.email || "",
          mobileNumber: school.mobile || "",
          affiliationNumber: school.affiliationNumber || "",
          affiliationCertificate: school.affiliationCertificate || null,
        });
      } else {
        setError("Invalid API response");
      }
    } catch (error) {
      setError("Failed to fetch school details.");
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }
    fetchSchoolDetails();
  }, [token, refresh]); 

 
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleFileChange = (e) => {
    setFormData({ ...formData, affiliationCertificate: e.target.files[0] });
  };

  
  const handleSaveClick = async () => {
    try {
      let updateData = {
        name: formData.schoolName,
        email: formData.email,
        mobile: formData.mobileNumber,
        affiliationNumber: formData.affiliationNumber,
      };

      let headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      if (formData.affiliationCertificate instanceof File) {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.schoolName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("mobile", formData.mobileNumber);
        formDataToSend.append("affiliationNumber", formData.affiliationNumber);
        formDataToSend.append("affiliationCertificate", formData.affiliationCertificate);

        headers["Content-Type"] = "multipart/form-data";
        updateData = formDataToSend;
      }

      const response = await axios.put(
        "http://localhost:5000/api/school/update",
        updateData,
        { headers }
      );

      console.log(" School details updated successfully:", response.data);

      
      setIsEditing(false);
      setRefresh((prev) => !prev); 

    } catch (error) {
      console.error(" Error updating school details:", error.response);
      setError("Failed to update school details.");
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center p-5 w-full bg-[#ECECEC]">
      <div className="bg-white p-6 sm:p-7 rounded-lg shadow-md w-full max-w-[1440px]">
        <form className="space-y-4 flex flex-col items-center">
       
          {[
            { label: "School Name", name: "schoolName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobileNumber", type: "tel" },
            { label: "Affiliation Number", name: "affiliationNumber", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="w-full max-w-lg">
              <label className="block text-gray-700 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 sm:py-3 border rounded-lg bg-white focus:bg-white focus:outline-none"
              />
            </div>
          ))}

          <div className="w-full max-w-lg">
            <label className="block text-gray-700 font-medium">Affiliation Certificate</label>
            <input
              type="file"
              name="affiliationCertificate"
              onChange={handleFileChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 sm:py-3 border rounded-lg bg-white focus:bg-white focus:outline-none"
            />
            {formData.affiliationCertificate && typeof formData.affiliationCertificate === "string" && (
              <div className="mt-2">
                <a href={formData.affiliationCertificate} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Current Certificate
                </a>
              </div>
            )}
          </div>

                 
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-lg">
            {!isEditing ? (
              <button type="button" onClick={() => setIsEditing(true)} className="w-full sm:w-[250px] py-2 sm:py-3 bg-[#FF902A] text-white rounded-lg font-semibold hover:bg-orange-600 transition">
                Edit
              </button>
            ) : (
              <button type="button" onClick={handleSaveClick} className="w-full sm:w-[250px] py-2 sm:py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
                Save
              </button>
            )}

            <button type="button" className="w-full sm:w-[250px] py-2 sm:py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetailsForm;
