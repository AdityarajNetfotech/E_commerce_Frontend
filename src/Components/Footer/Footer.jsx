import React from 'react'
import logo from "../Images/Group.png";
import socialMedia from "../Images/Frame 51.png"
import "./Footer.css"

function Footer() {
    return (
        <div className='footer-container  '>
            <div className='container '>
                <div className='footer-content d-flex justify-content-between align-item-center mt-4 mb-5'>
                    <div className='footer-leftSide d-flex flex-column'>
                        <div className='brand-name brand-title d-flex justify-content-center align-items-center mt-4 mb-5'>
                            <img src={logo} alt="logo" style={{ width: "66px", height: "69px" }} />
                            <div><span className="fw-bold custom-hw text-white mt-4 mb-5">Brand<span className="text-warning custom-hw mt-4 mb-5 ">Name</span></span></div>
                        </div>
                        <div className='mt-auto ms-7'>
                            <h4 className='text-white custom-style'>Follow Us</h4>
                            <img src={socialMedia} alt="logo" className="me-2 custom-img" />
                        </div>
                    </div>
                    <div className='footer-rightSide d-flex justify-content-between mt-4 mb-5 gap-25'  >
                        <div className='categories card-1 text-white'>
                            <h4 className='mt-4 mb-4 '>Categories</h4>
                            <div>
                                <ul className="d-flex flex-column align-items-start ps-0 list-unstyled">
                                    <li className=" custom-design mb-3 "><a className="text-decoration-none text-white" href>Uniform</a></li>
                                    <li className="custom-design mb-3 "><a className="text-decoration-none text-white" href>Books</a></li>
                                    <li className="custom-design mb-3 "><a className="text-decoration-none text-white" href>Stationary</a></li>
                                </ul>

                            </div>
                           

                        </div>
                        <div className="contacts customize-hw card-1 text-white">
                                <h4 className="mt-4 mb-4 ">Contact Us</h4>
                                <ul className="d-flex flex-column align-items-start ps-0 list-unstyled">
                                    <li className="custom-design mb-3 "><a className="text-decoration-none text-white" href>Phone: +91 844644464</a></li>
                                    <li className="custom-design mb-3 "><a className="text-decoration-none text-white" href>Email: info@netfotech.in</a></li>
                                </ul>
                            </div>
                    </div>

                </div>
                <p className='text-white text-center custom-p mb-4'>Copyright &copy; 2025 by Netfotech Solutions. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
