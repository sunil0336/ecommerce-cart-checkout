import { useEffect, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const Products = ({ goTo }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>

      {/* Go to Cart Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => goTo("cart")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Cart 🛒
        </button>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="p-4 rounded-lg bg-white shadow animate-pulse">
              <div className="h-40 bg-gray-300 rounded mb-3"/>
              <div className="h-4 bg-gray-300 rounded mb-2"/>
              <div className="h-4 bg-gray-300 rounded w-1/2"/>
              <div className="h-9 bg-gray-300 rounded mt-4"/>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
