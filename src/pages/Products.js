import { useEffect, useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const Products = ({ goTo }) => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // Category Filter Logic
  const filteredProducts = useMemo(() => {
    if (category === "All") return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-4 text-center">
        Products
      </h1>

      {/* Header Row → Filter Left | Cart Right */}
      <div className="flex flex-wrap items-center justify-between mb-6">

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {["All","Electronics","Fashion","Home","Mobiles"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full border transition
                ${category === c
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Go to Cart Button */}
        <button
          onClick={() => goTo("cart")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3 md:mt-0"
        >
          Go to Cart 🛒
        </button>
      </div>

      {/* Product Grid */}
      {loading ? (
        // Skeleton Loading
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
      ) : filteredProducts.length === 0 ? (
        // Empty State
        <div className="text-center text-gray-600 mt-10">
          No products found in this category
        </div>
      ) : (
        // Product List
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
