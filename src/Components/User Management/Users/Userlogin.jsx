import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../../Components/Images/Logo.png"; 
import OAuth from "../../GoogleFirebase/OAuth";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // API request to login
      const response = await axios.post("http://localhost:5000/api/student/login", {
        email,
        password,
      });
      console.log(response.data)
      setLoading(false);

      if (response.data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem("authToken", response.data.token);
      }

      alert("Login successful!");
      // Navigate to Student Main Landing Page
      navigate("/StudentMainLandingPage"); 
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    setShowPopup(true); 
  };

  const handlePopupResponse = (confirmed) => {
    setShowPopup(false); 
    if (confirmed) {
      navigate("/reset-password"); 
    }
  };

  return (
    <div className="bg-[#F7C322] min-h-screen flex items-center justify-center px-6 py-8">
      <div className="flex items-center gap-60">

        <div className="hidden md:block">
           <img src={Logo} alt="Company Logo" className="w-100 h-auto" />
        </div>
        
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF902A] text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <OAuth/>
      </div>

  
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-105">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Are you sure you want to reset your password?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/EmailResetPage")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => handlePopupResponse(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
