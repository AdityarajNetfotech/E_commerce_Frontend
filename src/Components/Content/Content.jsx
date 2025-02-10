import React from "react";
import "./Content.css";
import searchImg from "../Images/akar-icons_search.png";
import bookImg from "../Images/book-img.png"
import uniformImg from "../Images/uniform 1.png"
import stationaryImg from "../Images/line 1.png"
import group from "../Images/none.png"
 

const Content = () => {
    return (
        <div className="slider bg-warning">
            <div className="content-section bg-warning">
                {/* Left Section */}
                <div className="text-section">
                    <h1 className="heading ">Get School-Ready in One Click!</h1>
                    <p className="subheading">Shop Books, Uniforms, Stationery & More</p>
                    <div className="search-bar custom-mt">
                        <input type="text" placeholder="Search something" />
                        <button><img src={searchImg} alt="Boy" className="search" /></button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="image-container">
                    
                    <img src={group} alt="Background Circle" className="group" />
                </div>
            </div>
           {/* item section */}
            <div className=" item-Section ">
                <div className="cardOne ">
                    <div className=" card-item ">
                        <img className="service-card-img" src={uniformImg} alt="Message-Icon" title="Connect with Our Digital Marketing Team" />
                        <h5 className=" font-s">Uniform</h5>
                    </div>
                    
                </div>
                <div className=" cardtwo">
                    <div className=" card-item  ">
                        <img className="service-card-img " src={bookImg} alt="Feature-Icon" title="Web Development Services"  />
                        <h5 className="font-s">Books</h5>
                    </div>
                    
                    
                </div>
                <div className=" cardThree ">
                    <div className="card-item ">
                        <img className="service-card-img "  src={stationaryImg} alt="Sketch-Icon" title="Create Stunning UI Designs" />
                        <h5 className="font-s">Stationary</h5>
                    </div>
                    
                    
                </div>
                
            </div>


        </div>
    );
};

export default Content;
