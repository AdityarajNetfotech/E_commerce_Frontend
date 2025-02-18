import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [schools, setSchools] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    schoolId: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/school/getAllSchools");
        if (response.data.schools) {
          setSchools(response.data.schools);
        } else {
          setSchools([]);
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
        setSchools([]);
      }
    };
    fetchSchools();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.password || !formData.schoolId) {
      setError("Please provide all fields.");
      return;
    }

    try {
      // Make POST request to register student
      const response = await axios.post("http://localhost:5000/api/student/register", formData);

      if (response.status === 201) {
        // If registration is successful, navigate to OTP verification page
        alert("Registration successful! Please verify OTP.");
        navigate(`/otp-verification?email=${formData.email}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <section className="bg-[#F7C322] min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            User Registration
          </h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="1234567890"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Select School</label>
              <select
                name="schoolId"
                value={formData.schoolId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="">-- Select School --</option>
                {schools.map((school) => (
                  <option key={school._id} value={school._id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => navigate("/userLogin")}
              className="w-full text-white bg-red-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserRegister;
