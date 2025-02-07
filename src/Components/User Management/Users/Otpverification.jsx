import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(30); // Countdown timer (in seconds)
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (!email) {
      setError("No email provided for OTP verification.");
    }
    startResendTimer(); // Start countdown when component loads
  }, [email]);

  // Function to start the resend timer
  const startResendTimer = () => {
    setIsResendDisabled(true);
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsResendDisabled(false); // Enable resend button
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP input change
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace/Delete
  const handleKeyDown = (index, e) => {
    if ((e.key === "Backspace" || e.key === "Delete") && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Paste Event (Fills all 6 fields)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d{6}$/.test(pastedText)) return;

    setOtp(pastedText.split(""));
    inputRefs.current[5]?.focus();
  };

  // Function to verify OTP with the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (!email || otpCode.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/verifyEmail", {
        email,
        code: otpCode,
      });

      if (response.data.success) {
        alert("OTP verified successfully!");
        navigate("/UserLogin");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Verification failed. Please try again.");
    }
  };

  // Function to Resend OTP
  const handleResendOtp = async () => {
    try {
      setMessage(""); // Clear previous messages
      setError(""); 

      const response = await axios.post("http://localhost:5000/auth/resendOtp", { email });

      if (response.data.success) {
        setMessage("A new OTP has been sent to your email.");
        startResendTimer(); // Restart the timer
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setError("Error sending OTP. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full text-center bg-white px-6 sm:px-10 py-10 rounded-xl shadow-lg">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-1 text-gray-900">OTP Verification</h1>
          <p className="text-sm text-gray-500">Enter the 6-digit verification code sent to your email.</p>
        </header>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                className="w-12 h-12 text-center text-2xl font-bold text-gray-900 bg-gray-100 border border-transparent rounded-lg p-2.5 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
          >
            Verify OTP
          </button>
        </form>

        <div className="text-sm text-gray-500 mt-4">
          Didn't receive the code?{" "}
          <button
            onClick={handleResendOtp}
            className={`text-blue-600 hover:text-blue-700 ${
              isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isResendDisabled}
          >
            {isResendDisabled ? `Resend in ${resendTimer}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
