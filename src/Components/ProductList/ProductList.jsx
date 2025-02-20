import productsData from "../../data.js";
import ProductCard from "../ProductCards/ProductCard.jsx";

const ProductList = () => {
    return (
        <section className="products relative my-12 w-full ">
            <div className="absolute top-[29%] w-full h-[540px] bg-gray-300 z-0"></div>
            <div className="mx-8 relative z-10 xl:mx-auto">
                <div className="mb-5 mx-8">
                    <h1 className="text-4xl font-semibold w-auto inline-block border-b-4 border-orange-500 pb-2 max-[990px]:flex justify-center ml-1">Explore Products</h1>
                </div>
                <div className="grid grid-cols-3 gap-8 justify-center max-[990px]:flex max-[990px] :flex-col max-[990px]: flex-wrap">
                    {productsData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductList;
