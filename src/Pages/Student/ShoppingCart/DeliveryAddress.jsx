import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import Header from './header/CartHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


function DeliveryAddress() {
    const location = useLocation();
    const navigate = useNavigate();
    const cartData = location.state;
    const [studentId, setStudentId] = useState(null);
    const [schoolId, setSchoolId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        emailId: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        pincode: '',
        town: '',
        city: '',
        state: ''
    });

    const calculateTotalPrice = () => {
        if (!cartData || !Array.isArray(cartData)) {
            return 0;
        }

        return cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const totalPrice = calculateTotalPrice();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchStudentProfile = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get("http://localhost:5000/api/student/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const studentProfile = response.data;
            setStudentId(studentProfile._id);
            setSchoolId(studentProfile.school._id);
        } catch (error) {
            console.error("Error fetching profile:", error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchStudentProfile();
    }, []);
    // console.log("student id", studentId);
    // console.log("school id", schoolId);


    useEffect(() => {
        console.log("Cart Data from Navigation:", cartData);
    }, [cartData]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            if (!cartData || !studentId || !schoolId) {
                alert("Missing required information. Please try again.");
                setIsLoading(false);
                return;
            }
    
            const orderItems = cartData.map(item => ({
                product: item.product,
                quantity: item.quantity,
                ...(item.selectedSize && { selectedSize: item.selectedSize }),
                ...(item.selectedColor && { selectedColor: item.selectedColor }),
                ...(item.selectedMaterial && { selectedMaterial: item.selectedMaterial }),
            }));
            
    
            const orderData = {
                school: schoolId,
                orderItems,
                address: { ...formData },
                totalPrice,
            };
    
            const token = localStorage.getItem("authToken");
    
            
            const orderResponse = await axios.post("http://localhost:5000/api/order/add-order", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            const { _id: orderId } = orderResponse.data;
            console.log("Order created successfully:", orderId);
            localStorage.setItem("latestOrderId", orderId); // Store the latest order ID
    
           
            const paymentResponse = await axios.post("http://localhost:5000/api/payment/create-order", {
                amount: totalPrice,  
                currency: "INR",
            });
    
            const { id: razorpayOrderId, amount, currency } = paymentResponse.data;
    
    
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: amount,
                currency: currency,
                name: "EduKart",
                description: "Purchase Order",
                order_id: razorpayOrderId,
                handler: async function (response) {
                    try {
                        console.log("Payment success:", response);
                        await axios.post("http://localhost:5000/api/payment/verify-payment", response);
                        alert("Payment Successful!");
    
                        navigate("/OrderSuccessful");
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        alert("Payment verification failed. Contact support.");
                    }
                },
                prefill: {
                    name: formData.name || "Customer",
                    email: formData.emailId,
                    contact: formData.phoneNumber,
                },
                theme: {
                    color: "#F37254",
                },
            };
    
            // Load Razorpay dynamically (in case script is missing)
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => {
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            };
            document.body.appendChild(script);
        } catch (error) {
            console.error("Error placing order:", error.response?.data?.message || error.message);
            alert("Failed to place order. Try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    
    return (
        <>
            <CustomNavbar />
            <Header />

            <p className='text-3xl font-bold text-center my-6'>Enter Delivery Address</p>

            <section className='mb-12'>
                <div className='flex flex-col lg:flex-row justify-center items-start p-4 lg:px-16 lg:space-x-35'>
                    <div className="text-[#635D5A] w-full lg:w-[1000px]  bg-white shadow-lg p-8 rounded-lg">
                        <h2 className="text-xl font-bold text-center">Contact Details</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="relative">
                                    <label htmlFor="emailId" className='pl-0.5'>Email ID*</label>
                                    <input
                                        type="email"
                                        name="emailId"
                                        id="emailId"
                                        placeholder="abc@xyz.com"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.emailId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <label htmlFor="phoneNumber" className='pl-0.5'>Phone Number*</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        placeholder="+91 0000000000"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-xl font-semibold mb-4 text-center">Address</h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label htmlFor="addressLine1" className='pl-0.5'>Address Line 1*</label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            id="addressLine1"
                                            placeholder="Address (House no, Building, Street, Area)"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.addressLine1}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="addressLine2" className='pl-0.5'>Address Line 2</label>
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            id="addressLine2"
                                            placeholder="Address (House no, Building, Street, Area)"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.addressLine2}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label htmlFor="pincode" className='pl-0.5'>Pin Code*</label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                id="pincode"
                                                placeholder="0000"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="town" className='pl-0.5'>Locality/Town*</label>
                                            <input
                                                type="text"
                                                name="town"
                                                id="town"
                                                placeholder="Locality/Town"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.town}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label htmlFor="city" className='pl-0.5'>City/District*</label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                placeholder="City Name"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="state" className='pl-0.5'>State*</label>
                                            <input
                                                type="text"
                                                name="state"
                                                id="state"
                                                placeholder="State Name"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 text-white py-3 mt-4 rounded-lg hover:bg-orange-600 transition"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Processing..." : "Place Order"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-peach-custom p-5 rounded-lg shadow-lg w-full lg:w-1/3 flex flex-col items-center space-y-4">

                        <h2 className="text-3xl font-semibold text-black">Order Summary</h2>


                        <div className="bg-white shadow-md p-5 w-full  rounded-lg">

                            <div className="space-y-4">
                                <div className="flex justify-between text-lg">
                                    <span className="text-gray-700">Subtotal</span>
                                    <span className="text-gray-800 font-medium">₹ {totalPrice}</span>
                                </div>

                                <div className="flex justify-between text-lg text-red-500">
                                    <span>Discount (-20%)</span>
                                    <span>- ₹ 0</span>
                                </div>

                                <div className="flex justify-between text-lg">
                                    <span className="text-gray-700">Shipping Charges</span>
                                    <span className="text-gray-800">₹ 0</span>
                                </div>

                                <hr className="border-gray-300" />

                                <div className="flex justify-between text-xl font-bold text-green-600">
                                    <span>Total</span>
                                    <span>₹ {totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default DeliveryAddress