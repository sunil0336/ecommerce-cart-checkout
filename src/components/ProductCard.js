import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useCart();

  const isInCart = cart.items.some(
    (i) => i.product.id === product.id
  );

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="w-full h-40 overflow-hidden rounded mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-gray-600">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        disabled={isInCart}
        className={`mt-3 w-full py-2 rounded-md transition ${
          isInCart
            ? "bg-green-500 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isInCart ? "Added ✔" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
