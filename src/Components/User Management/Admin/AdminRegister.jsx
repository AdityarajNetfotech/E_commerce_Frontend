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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/admin/register", formData);
      
      console.log(response.data);
  
      if (response.data && response.status === 201) { // ✅ Check status code
        alert("Admin registered successfully");
        navigate("/AdminLogin"); 
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
    }
  };
  

  return (
    <section className="bg-[#F7C322] min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="flex items-center gap-60">
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
