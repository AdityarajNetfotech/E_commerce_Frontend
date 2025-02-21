import React, { useState } from 'react'
import CustomNavbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/footer/Footer';
import SidebarButtons from '../../../Components/button/Button';
import Header from '../MyOrders/header/OrderHeader';

function CustomerCare() {
    const [activeTab, setActiveTab] = useState('help');
    const [openIndex, setOpenIndex] = useState(null);

    const customercare = "Customer Care"

    return (
        <>
            <CustomNavbar />
            <Header heading={customercare} />
            
            <section className='flex flex-col lg:flex-row justify-center items-stretch bg-[#ECECEC] min-h-screen p-15 gap-0'>
                <SidebarButtons />
                <div className='w-full lg:w-[750px] bg-white shadow-lg rounded-lg p-8'>
                    <div className='flex justify-between cursor-pointer text-[22px]'>
                        <span onClick={() => setActiveTab('help')} className={activeTab === 'help' ? 'font-bold border-b-[1.5px] border-[#FF902B] pb-1' : ''}>Help & Support</span>
                        <span onClick={() => setActiveTab('faq')} className={activeTab === 'faq' ? 'font-bold border-b-[1.5px] border-[#FF902B] pb-1' : ''}>FAQ</span>
                        <span onClick={() => setActiveTab('terms')} className={activeTab === 'terms' ? 'font-bold border-b-[1.5px] border-[#FF902B] pb-1' : ''}>Term & Conditions</span>
                    </div>
                    <hr className='my-4' />
                    <div className='mt-4'>
                        {activeTab === 'help' && (
                            <div>
                                <div>
                                    <p className='font-bold' style={{ color: "#4163BC" }}>Help & Support</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, in. Ipsa, temporibus.</p>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt molestias eligendi tempora doloremque molestiae veniam.
                                        <br />
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, animi! Enim possimus vel optio labore et exercitationem blanditiis, qui ipsum excepturi, aspernatur ea, dolorem tenetur sed? Eos error ullam maiores fugit, quibusdam esse at quas? Adipisci tenetur ad culpa dolor maiores enim asperiores.
                                    </p>
                                </div>
                                <hr className='my-4' />
                                <div>
                                    <p className='font-bold' style={{ color: "#4163BC" }}>Contact Us</p>
                                    <p><i class="fa-solid fa-envelope mr-2 text-[#4163BC]" />saad@gmail.com</p>
                                    <p><i class="fa-solid fa-phone mr-2 text-[#4163BC]" />+91 0000000000</p>
                                    <p><i class="fa-solid fa-location-dot mr-2 text-[#4163BC]" />Pune Maharashtra</p>
                                </div>
                            </div>
                        )}
                        {activeTab === 'faq' && (
                            <div>
                                <p className='font-bold' style={{ color: "#4163BC" }}>FAQ's</p>
                                <div className='border-b-[1.5px] border-gray-400'>
                                    <button
                                        className="w-full py-2 font-bold flex justify-between"
                                        onClick={() => setOpenIndex(openIndex === 0 ? null : 0)} // Toggle the first FAQ
                                    >
                                        <span>Product Details 1</span>
                                        <span
                                            className={`rounded-full border border-blue-500 p-1 inline-flex items-center justify-center transition-transform duration-300 ${openIndex === 0 ? "rotate-180" : ""}`}
                                        >
                                            <i className="fa-solid fa-chevron-down text-blue-700"></i>
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === 0 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="pb-3 bg-white">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, inventore ipsa. Voluptates repellat repudiandae tenetur officiis tempora molestiae optio minima veniam quasi?
                                        </div>
                                    </div>
                                </div>
                                <div className='border-b-[1.5px] border-gray-400'>
                                    <button
                                        className="w-full py-2 font-bold flex justify-between"
                                        onClick={() => setOpenIndex(openIndex === 1 ? null : 1)} // Toggle the second FAQ
                                    >
                                        <span>Product Details 2</span>
                                        <span
                                            className={`rounded-full border border-blue-500 p-1 inline-flex items-center justify-center transition-transform duration-300 ${openIndex === 1 ? "rotate-180" : ""}`}
                                        >
                                            <i className="fa-solid fa-chevron-down text-blue-700"></i>
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === 1 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="pb-3 bg-white">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, inventore ipsa. Voluptates repellat repudiandae tenetur officiis tempora molestiae optio minima veniam quasi?
                                        </div>
                                    </div>
                                </div>
                                <div className='border-b-[1.5px] border-gray-400'>
                                    <button
                                        className="w-full py-2 font-bold flex justify-between"
                                        onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
                                    >
                                        <span>Product Details 3</span>
                                        <span
                                            className={`rounded-full border border-blue-500 p-1 inline-flex items-center justify-center transition-transform duration-300 ${openIndex === 2 ? "rotate-180" : ""}`}
                                        >
                                            <i className="fa-solid fa-chevron-down text-blue-700"></i>
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === 2 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="pb-3 bg-white">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, inventore ipsa. Voluptates repellat repudiandae tenetur officiis tempora molestiae optio minima veniam quasi?
                                        </div>
                                    </div>
                                </div>
                                <div className='border-b-[1.5px] border-gray-400'>
                                    <button
                                        className="w-full py-2 font-bold flex justify-between"
                                        onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
                                    >
                                        <span>Product Details 3</span>
                                        <span
                                            className={`rounded-full border border-blue-500 p-1 inline-flex items-center justify-center transition-transform duration-300 ${openIndex === 3 ? "rotate-180" : ""}`}
                                        >
                                            <i className="fa-solid fa-chevron-down text-blue-700"></i>
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === 3 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="pb-3 bg-white">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, inventore ipsa. Voluptates repellat repudiandae tenetur officiis tempora molestiae optio minima veniam quasi?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'terms' && (
                            <div>
                                <div>
                                    <p className='font-bold mb-2' style={{ color: "#4163BC" }}>Term & Conditions</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, in. Ipsa, temporibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos libero vel unde quo totam aperiam, fuga animi voluptate eveniet maxime sunt earum quibusdam soluta laborum necessitatibus rerum, iure id consectetur. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt molestias eligendi tempora doloremque molestiae veniam.</p>
                                </div>
                                <div>
                                    <p className='font-bold mb-2' style={{ color: "#4163BC" }}>Privacy Policy</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, in. Ipsa, temporibus.</p>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt molestias eligendi tempora doloremque molestiae veniam.</p>
                                </div>
                                <div>
                                    <p className='font-bold mb-2' style={{ color: "#4163BC" }}>How This Information Used</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, in. Ipsa, temporibus
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt molestias eligendi tempora doloremque molestiae veniam.</p>
                                </div>
                                <hr className='mt-4' />
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default CustomerCare