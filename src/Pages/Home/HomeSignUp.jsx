import React from 'react'
import group from '../../Components/Images/educartlogo.png';
import { Link } from 'react-router-dom';

function HomeSignUp() {
    return (
        <>
            <section className="min-h-screen bg-[#F7C322] flex flex-col md:flex-row lg:justify-around items-center font-bold px-6 justify-center gap-18">

                <div className="flex items-center">
                    <img src={group} alt="Brand Logo" className="w-22 h-22 md:w-24 md:h-24" />
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 ml-2">
                        Edu<span className="text-blue-600">Kart</span>
                    </h1>
                </div>

                <div className="bg-white py-6 px-8 text-center rounded-lg w-full max-w-sm">

                    <h1 className="mb-4">Register as</h1>
                    <button className="bg-[#FF902A] text-white py-2 w-full md:w-[280px] lg:w-[300px] rounded-lg cursor-pointer mb-2">
                        <Link to="/SchoolRegister"> School Authority </Link>
                    </button>
                    <br />
                    <button className="bg-[#131313] text-white py-2 w-full md:w-[280px] lg:w-[300px] rounded-lg cursor-pointer">
                        <Link to="/UserRegister"> Parent/Student </Link>
                    </button>

                </div>

            </section>

        </>
    )
}

export default HomeSignUp

