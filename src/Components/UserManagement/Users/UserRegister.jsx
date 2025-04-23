import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../../../Components/Images/Logo.png";

function UserRegister() {
  const [schools, setSchools] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    schoolId: "",
    grade: "",
    gender: "",
    number: "",
  });
  const romanNumerals = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-backend-phi-five.vercel.app/api/admin/getAllSchools"
        );
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
    setLoading(true);
    setUploadProgress(0); // Reset progress

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.schoolId ||
      !formData.grade ||
      !formData.gender ||
      !formData.number
    ) {
      setError("Please provide all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://e-commerce-backend-phi-five.vercel.app/api/student/register",
        formData,{
          onUploadProgress: (progressEvent) => {
            // Calculate progress percentage
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        }
        
      );
      

      if (response.status === 201) {
        alert("Registration successful! Please verify OTP.");
        navigate(`/otp-verification?email=${formData.email}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F7C322] min-h-screen flex items-center justify-center px-6 py-8">
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
          <img src={Logo} alt="Company Logo" className="w-150 h-auto" />
        </div>

        <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-3.5">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              User Registration
            </h1>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select School
                </label>
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Grade
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="">
                    Select Grade
                  </option>
                  {romanNumerals.map((num, index) => (
                    <option key={num} value={index + 1}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" >
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#FF902A] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => navigate("/userLogin")}
                className="w-full text-white bg-[#131313] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserRegister;
