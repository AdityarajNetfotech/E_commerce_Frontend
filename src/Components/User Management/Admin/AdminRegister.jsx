import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../Components/Images/Logo.png"; 
import axios from "axios";

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setUploadProgress(0); // Reset progress
  
    try {
      const response = await axios.post("http://localhost:5000/api/admin/register", formData,{
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      
      console.log(response.data);
  
      if (response.data && response.status === 201) { // ✅ Check status code
        alert("Admin registered successfully");
        navigate("/AdminDashboard"); 
      } else if (response.data && response.data.message === "User already exists") {
        alert("User already exists");
        setError("User already exists. Please use a different email.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering admin:", error.response || error);
  
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Show backend error message
        setError(error.response.data.message);
      } else {
        alert("Registration failed. Please try again.");
        setError("Registration failed. Please try again.");
      }
    }finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="bg-[#F7C322] min-h-screen flex flex-col items-center justify-center px-6 py-8">
       {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
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
          <img src={Logo} alt="Company Logo" className="w-140 h-auto" />
        </div>
        
        <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Admin Registration
            </h1>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Admin Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
                <input type="number" name="mobile" value={formData.mobile} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              </div>
              <button type="submit" className="w-full text-white bg-[#FF902A] hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 my-4">
                Register
              </button>
              <button type="button" onClick={() => navigate("/AdminLogin")} className="w-full text-white bg-[#131313] hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminRegister;
