import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailOtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value.substring(0, 1); // Allow only one digit per input box
    setOtp(newOtp);

    // Auto-focus to next field if a number is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const enteredOtp = otp.join(""); // Combine digits into a full OTP

    if (enteredOtp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      // Send OTP to the backend for verification
      const response = await fetch("https://e-commerce-backend-phi-five.vercel.app/api/student/verify-forgot-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensures session data is used
        body: JSON.stringify({ otp: enteredOtp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP. Please try again.");
      }

      setSuccessMessage("OTP verified successfully. Redirecting...");
      setTimeout(() => {
        navigate("/ChangePasswordPage"); // Redirect to change password page
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7C322] min-h-screen flex items-center justify-center px-6 py-8">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-6">
                <div className="flex flex-row items-center justify-around mx-auto w-full max-w-xs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`digit-${index}`}
                      className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                  ))}
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FF902A] text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {loading ? "Verifying..." : "Verify Account"}
                </button>

                <div className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't receive code?</p>
                  <button
                    type="button"
                    className="text-blue-600"
                    onClick={() => window.location.reload()} // Reload to resend OTP
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailOtpPage;
