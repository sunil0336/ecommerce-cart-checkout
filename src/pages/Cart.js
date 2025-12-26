import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const TAX_RATE = 0.18;

const Cart = ({ goTo }) => {
  const { cart, removeFromCart, updateQuantity, applyCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");

  const subtotal = useMemo(
    () => cart.items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    [cart.items]
  );

  const tax = subtotal * TAX_RATE;
  const discount = cart.coupon === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;

  // Empty Cart UI
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          className="w-40 mb-4 opacity-80"
          alt="empty-cart"
        />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-500 mb-4">Add items to continue shopping</p>

        <button
          onClick={() => goTo("products")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.product.id} className="flex items-center bg-white p-4 rounded shadow">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-gray-600">₹{item.product.price}</p>

                <div className="flex items-center justify-between mt-2">

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded bg-gray-100 hover:bg-gray-200"
                    >
                      −
                    </button>

                    <span className="min-w-[28px] text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      removeFromCart(item.product.id);
                      toast("Item removed", { icon: "🗑️" });
                    }}

                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>


              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-semibold text-lg">Order Summary</h2>
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax (18%): ₹{tax.toFixed(2)}</p>
          <p>Discount: -₹{discount.toFixed(2)}</p>
          <hr />
          <p className="font-bold text-lg">Total: ₹{total.toFixed(2)}</p>

          <input
            type="text"
            placeholder="Enter coupon"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <button
            onClick={() => {
              applyCoupon(couponInput);
              toast.success("Coupon applied");
            }}

            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Apply Coupon
          </button>

          <button
            onClick={() => goTo("checkout")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
