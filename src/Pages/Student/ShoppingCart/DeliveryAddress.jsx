import React, { useEffect, useState } from 'react';
import CustomNavbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import Header from './header/CartHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderSummary from '../../../Components/order-summary/OrderSummary';
import axios from 'axios';

function DeliveryAddress() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartData = location.state;

  const [studentId, setStudentId] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasSavedAddress, setHasSavedAddress] = useState(false);


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
    if (!cartData || !Array.isArray(cartData)) return 0;
    return cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotalPrice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const fetchStudentProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:5000/api/student/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const student = res.data;
      setStudentId(student._id);
      setSchoolId(student.school._id);
    } catch (err) {
      console.error("Profile fetch error:", err.message);
    }
  };

  const fetchSavedAddress = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:5000/api/order/address", {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (res.data && Object.keys(res.data).length > 0) {
        setFormData(res.data);
        setHasSavedAddress(true);    // Returning user
        setIsEditing(false);         // Start in view-only mode
      } else {
        setHasSavedAddress(false);   // New user
        setIsEditing(true);          // Allow input immediately
      }
    } catch (err) {
      console.error("Fetch saved address error:", err.message);
      setIsEditing(true); // Fallback to editable if something breaks
    }
  };

  
  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put("http://localhost:5000/api/order/address", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Address updated successfully.");
      setIsEditing(false);
    } catch (err) {
      console.error("Address update error:", err.message);
      alert("Failed to update address.");
    }
  };

  useEffect(() => {
    fetchStudentProfile();
    fetchSavedAddress();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!cartData || !studentId || !schoolId) {
        alert("Missing required information.");
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

      const orderRes = await axios.post("http://localhost:5000/api/order/add-order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const { _id: orderId } = orderRes.data;
      localStorage.setItem("latestOrderId", orderId);

      const paymentRes = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: totalPrice,
        currency: "INR",
      });

      const { id: razorpayOrderId, amount, currency } = paymentRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "EduKart",
        description: "Purchase Order",
        order_id: razorpayOrderId,
        handler: async function (response) {
            try {
              await axios.post("http://localhost:5000/api/payment/verify-payment", response);
          
              // ✅ Update paymentStatus to "Paid"
              const token = localStorage.getItem("authToken");
              const orderId = localStorage.getItem("latestOrderId");
          
              await axios.put(`http://localhost:5000/api/order/update-payment/${orderId}`, 
                { paymentStatus: "Paid" },
                { headers: { Authorization: `Bearer ${token}` } }
              );
          
              alert("Payment Successful!");
              navigate("/OrderSuccessful");
            } catch (error) {
              console.error("Payment verification failed:", error);
          
              // ❌ Update paymentStatus to "Pending"
              const token = localStorage.getItem("authToken");
              const orderId = localStorage.getItem("latestOrderId");
          
              await axios.put(`http://localhost:5000/api/orders/update-payment/${orderId}`, 
                { paymentStatus: "Pending" },
                { headers: { Authorization: `Bearer ${token}` } }
              );
          
              alert("Payment verification failed.");
            }
          },
        prefill: {
          name: formData.name || "Customer",
          email: formData.emailId,
          contact: formData.phoneNumber,
        },
        theme: { color: "#F37254" },
      };

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert("Sorry, the quantity you selected exceeds the available stock.");
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
          <div className="text-[#635D5A] w-full lg:w-[1000px] bg-white shadow-lg p-8 rounded-lg">
            <h2 className="text-xl font-bold text-center">Contact Details</h2>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                <div className="relative">
                            <label htmlFor="emailId" className='pl-0.5'  >Email ID*</label>
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

           {/* Edit / Save / Cancel Buttons */}
          {hasSavedAddress && (
          <div className="md:col-span-2 flex gap-4 p-3 mt-4">
            {!isEditing ? (
            <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full bg-black hover:bg-gray-600 text-white font-semibold p-3 rounded-[400px] transition"
           >
            Edit Address
            </button>
          ) : (
           <>
            <button
            type="button"
            onClick={handleSaveClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-md transition"
           >
            Save Address
            </button>
            <button
            type="button"
            className="w-full bg-black hover:bg-gray-600 text-white font-semibold p-3 rounded-md transition"
            onClick={() => setIsEditing(false)}
               >
             Cancel Editing
             </button>
             </>
              )}
            </div>
        )}


              {/* Place Order Button */}
              <div className="mt-3">
                <button
                  type="submit"
                  className="w-full bg-yellow-300 text-black py-3 rounded-[400px] hover:bg-yellow-600 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Proceed to Buy"}
                </button>
              </div>

            </form>
          </div>

          <OrderSummary totalPrice={totalPrice} />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default DeliveryAddress;
