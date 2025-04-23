import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';


function ProdDetailComp() {
    const [productsCards, setProductsCards] = useState([]);


    useEffect(() => {
        const fetchProductsCards = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("https://e-commerce-backend-phi-five.vercel.app/api/student/products", {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                setProductsCards(response.data);
            } catch (error) {
                console.log(error.response?.data?.message || error.message || "Failed to fetch products");
            }
        };
        fetchProductsCards();
    }, []);


    return (
        <>
            <section className="my-12">
                <div className="h-[300px] bg-gray-300 transition-all duration-300 peer">
                    <div className="relative z-1000 top-[50px] w-[85%] mx-auto main">
                        <span className="text-3xl sm:text-4xl font-semibold pb-2 border-b-4 border-[#FF902B]">
                            Often Bought Together
                        </span>

                        <div className="flex justify-between mt-7 gap-1.5 card-main">
                            {productsCards.length > 0 ? (
                                productsCards.slice(0, 3).map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No products available</p>
                            )}
                        </div>
                        <style>
                            {`
                                  @media (max-width: 1058px) {
                                        .card-main {
                                            display: flex;
                                            flex-wrap: wrap;
                                            justify-content: center;
                                            gap: 10px;
                                        }
                                        .card-main > * {
                                            width: 48%; 
                                        }
                                        .peer {
                                            height: 100%;
                                        }
                                        .main {
                                            position: static;
                                            padding: 20px 0px;
                                        }
                                        .main-hidden {
                                            display: none;
                                        }
                                    }

                                    @media (max-width: 768px) {
                                        .card-main {
                                            flex-direction: column;
                                            align-items: center;
                                        }
                                        .card-main > * {
                                            width: 100%;
                                        }
                                    }

                                `}
                        </style>
                    </div>
                </div>

                <div className="h-[300px] bg-white transition-all duration-300 main-hidden"></div>
            </section>
        </>
    )
}

export default ProdDetailComp
