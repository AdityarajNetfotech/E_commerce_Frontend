import { useState,useEffect } from "react";
import {indianStates} from "../../states/StatesNames";
import { useNavigate } from "react-router-dom";
import Logo from "../../../Components/Images/Logo.png"; 
import axios from "axios";

function SchoolRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    state: "",
    address: "",
    affiliationNumber: "",
    gstNumber: "",
    affiliationCertificate: null,
  });

  const navigate = useNavigate(); // Uncommented navigate
  const [gstError, setGstError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state

  // useEffect(() => {
  //   if (loading) {
  //     document.body.style.overflow = "hidden"; // Disable scroll
  //   } else {
  //     document.body.style.overflow = "auto"; // Enable scroll
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto"; // Cleanup on unmount
  //   };
  // }, [loading]);

  // const handleChange = (e) => {
  //   if (e.target.name === "affiliationCertificate") {
  //     setFormData({ ...formData, affiliationCertificate: e.target.files[0] });
  //   } else {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   }
  //   if (name === "gstNumber") {
  //     const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  //     setGstError(gstRegex.test(value) ? "" : "Invalid GST number format");
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "affiliationCertificate") {
      setFormData({ ...formData, affiliationCertificate: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "gstNumber") {
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        setGstError(gstRegex.test(value) ? "" : "Invalid GST number format");
      }
      if (name === "mobile") {
        const mobileRegex = /^\d{10}$/; // Ensures only 10 digits
        setMobileError(mobileRegex.test(value) ? "" : "Mobile number must be exactly 10 digits");
      }
      
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGstError("");
    setMobileError("");
    setError(""); // Reset previous errors
    setLoading(true);
    setUploadProgress(0); // Reset progress

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(formData.gstNumber)) {
      setGstError("Invalid GST number format");
      setLoading(false);
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setGstError("Invalid Mobile number format");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    
    // Append all form fields to FormData
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
  //https://e-commerce-backend-phi-five.vercel.app/api/school/register
    try {
      const response = await axios.post("https://e-commerce-backend-phi-five.vercel.app/api/school/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          // Calculate progress percentage
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
  
      // Log response data for debugging
      console.log(response.data);
  
      // Check for success condition based on the message
      if (response.data) {
        // Show success alert and navigate
        alert(response.data.message); // Use the message from the backend
        navigate("/RegistrationApprovePage"); 
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Error registering school:", error.response || error);
      setError("Registration failed. Please try again.");
    }finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="bg-[#F7C322] min-h-screen flex flex-col items-center justify-center px-6 py-8">
       {loading && (
        <div className="absolute w-full inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center w-80 bg-white p-5 rounded-lg shadow-lg">
            <p className="text-gray-700 text-lg font-semibold mb-2">Uploading...</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-600 text-sm mt-2">{uploadProgress}%</p>
          </div>
        </div>
      )}
       <div className={`flex items-center gap-60 transition-all duration-300 ${loading ? "blur-sm pointer-events-none" : ""}`}>
                  <div className="hidden md:block">
                    <img src={Logo} alt="Company Logo" className="w-100 h-auto" />
                  </div>
      
      <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            School Registration
          </h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">School Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
              <input type="number" name="mobile" value={formData.mobile} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {mobileError && <p className="text-red-500 text-xs mt-1">{mobileError}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">GST Number</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
                {gstError && <p className="text-red-500 text-xs mt-1">{gstError}</p>}
              </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Affiliation Number</label>
              <input type="text" name="affiliationNumber" value={formData.affiliationNumber} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Affiliation Certificate</label>
              <input type="file" name="affiliationCertificate" onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            </div>
            <button type="submit" className="w-full text-white bg-[#FF902A] hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 my-4">
              Register
            </button>
            <button type="button" onClick={() => navigate("/schoolLogin")} className="w-full text-white bg-[#131313] hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">
              Login
            </button>
          </form>
        </div>
      </div>
     </div>
    </section>
    
  );
}



export default SchoolRegister;
