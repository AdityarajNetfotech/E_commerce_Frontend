import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const res = await signInWithPopup(auth, provider);
            const email = res.user.email;

            // console.log("Firebase Response", res.user);

            const { data } = await axios.post("http://localhost:5000/api/googleAuth/google-signin", { email });

            // console.log("Response:", data);

            alert(`Login successful as ${data.role}`);


            if (data.role === "Student") {
                localStorage.setItem("authToken", data.token);
                navigate("/StudentMainLandingPage");
            } else if (data.role === "School") {
                localStorage.setItem("schoolToken", data.token);
                navigate("/Dashboard");
            } else if (data.role === "Admin") {
                localStorage.setItem("adminToken", data.token);
                navigate("/AdminDashboard");
            } else {
                alert("Invalid role detected");
            }


        } catch (error) {
            console.error("Google Sign-in Error:", error);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <>
            <div className="flex justify-center space-x-4">
                <button onClick={handleGoogleClick} className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-full h-5 mr-2" />
                    Google
                </button>
            </div>
        </>
    )
}

export default OAuth
