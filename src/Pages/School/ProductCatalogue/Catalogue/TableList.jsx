import React, { useEffect, useState } from 'react';
import TableRow from './TableRow';
import Prev from "../../../../Components/Images/PrevArrow.png";
import Next from "../../../../Components/Images/NextArrow.png";
import search from "../../../../Components/Images/SearchOutline.png";
import Replay from "../../../../Components/Images/ReplayIcon.png"
import { Link } from 'react-router-dom';
import axios from 'axios';


const TableList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("schoolToken");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/product/my-products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                console.log("Backend Response:", data);
                setProducts(data);
                console.log("Products State:", products);
                setLoading(false);



            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        console.log("Updated Products State:", products);
    }, [products]);




    const [filters, setFilters] = useState({
        color: '',
        category: '',
        grade: '',
        gender: '',
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            color: 'Red',
            category: 'Uniform',
            grade: 'Fourth',
            gender: '',
        });
    };

    const handleDeleteProduct = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    const filteredData = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filters.category === '' || product.category === filters.category)
        );
    });


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const paginatedProducts = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (


        <div className="mx-auto bg-[#ECECEC] p-4">
            <div className="p-5 bg-white">
                <div className="mx-auto bg-white">
                    <div className="bg-yellow-100 p-4 rounded-lg shadow-md space-y-4">

                        <div className="flex flex-wrap items-center gap-5">

                            <div className="flex items-center space-x-2 bg-white">
                                <input
                                    className="p-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
                                    type="text"
                                    placeholder="Search something"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button className="text-yellow-500 p-2">
                                    <img src={search} alt="Search" />
                                </button>
                            </div>



                            <div className="bg-white p-1 rounded-lg">
                                <span>Color: </span>
                                <select
                                    className="p-2 border-0"
                                    value={filters.color}
                                    onChange={(e) => handleFilterChange("color", e.target.value)}
                                >
                                    <option value="">Color</option>
                                    <option value="Red">Red</option>
                                </select>
                            </div>
                            <div className="bg-white p-1 rounded-lg">
                                <span>Category: </span>
                                <select
                                    className="p-2 border-0"
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">All</option>
                                    <option value="Uniform">Uniform</option>
                                    <option value="Books">Books</option>
                                    <option value="Stationary">Stationary</option>
                                </select>
                            </div>
                            <div className="bg-white p-1 rounded-lg">
                                <span>Grade: </span>
                                <select
                                    className="p-2 border-0"
                                    value={filters.grade}
                                    onChange={(e) => handleFilterChange("grade", e.target.value)}
                                >
                                    <option value="">Grade</option>
                                    <option value="Fourth">Fourth</option>
                                </select>
                            </div>
                            <div className="bg-white p-1 rounded-lg">
                                <span>Gender: </span>
                                <select
                                    className="p-2 border-0"
                                    value={filters.gender}
                                    onChange={(e) => handleFilterChange("gender", e.target.value)}
                                >
                                    <option value="">Gender</option>
                                </select>
                            </div>


                            <div>
                                <button className="text-gray-500 flex items-center gap-2" onClick={handleResetFilters}>
                                    <img src={Replay} alt="Reset Filter" /> Reset Filter
                                </button>
                            </div>
                        </div>


                        <div className="flex flex-wrap justify-between items-center gap-4">

                            <div className="text-2xl font-semibold">
                                <span className="text-4xl">{filteredData.length}</span> Products
                            </div>

                            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                                <Link to='/add-product'>Add New Product +</Link>
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 bg-white rounded-lg overflow-x-auto">
                        <table className="min-w-full border-spacing-y-3 border-separate">
                            <thead className="bg-[#F4F4F4]">
                                <tr>
                                    <th className="py-2 px-4 text-left">Product Detail</th>
                                    <th className="py-2 px-4 text-left">SKU</th>
                                    <th className="py-2 px-4 text-left">Category</th>
                                    <th className="py-2 px-4 text-left">Stock</th>
                                    <th className="py-2 px-4 text-left">Price</th>
                                    <th className="py-2 px-4 text-left">Status</th>
                                    <th className="py-2 px-4 text-left">Added</th>
                                    <th className="py-2 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {loading ? (
                                    <p>Loading products...</p>
                                ) : products.length > 0 ? (
                                    paginatedProducts.map((product, index) => (

                                        <TableRow key={product._id} product={product} index={index} onDelete={handleDeleteProduct} />

                                    ))
                                ) : (
                                    <p>No products found</p>
                                )}

                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 justify-center">
                        <button
                            className="text-gray-500 flex items-center gap-2"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <img src={Prev} alt="Previous" className="w-4 h-4" />
                            <span>Prev</span>
                        </button>
                        <div>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</div>
                        <button
                            className="text-gray-500 flex items-center gap-2"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage))
                                )
                            }
                            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                        >
                            <span>Next</span>
                            <img src={Next} alt="Next" className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TableList;