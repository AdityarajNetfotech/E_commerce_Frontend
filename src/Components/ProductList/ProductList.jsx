import productsData from "../../data.js";
import ProductCard from "../ProductCards/ProductCard.jsx";

const ProductList = () => {
    return (
        <section className="products relative my-12 w-full mb-32">
            <div className="absolute top-[29%] w-full h-[540px] bg-gray-300 z-0"></div>
            <div className="relative z-10 xl:mx-auto w-[85%] m-auto">
                <h1 className="text-4xl font-semibold w-auto inline-block border-b-4 border-orange-500 pb-2 text-center mb-8 ml-4">
                    Explore Products
                </h1>

                <div className="flex flex-wrap justify-center gap-y-20 m-auto">
                    {productsData.map((product) => (
                        <div className="w-full sm:w-1/2 lg:w-1/3">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default ProductList;
