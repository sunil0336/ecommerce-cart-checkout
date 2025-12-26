import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

const TAX_RATE = 0.18;

const OrderSummary = ({ checkoutData, onConfirm }) => {
  const { cart } = useCart();

  const [proofFile, setProofFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Cart Calculations
  const subtotal = useMemo(
    () => cart.items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    [cart.items]
  );

  const tax = subtotal * TAX_RATE;
  const discount = cart.coupon === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;

  // Handle Confirm Order
  const handleConfirm = () => {
    const formData = new FormData();

    Object.entries(checkoutData).forEach(([k, v]) =>
      formData.append(k, v)
    );

    if (proofFile) {
      formData.append("deliveryProof", proofFile);
    }

    console.log("Submitted Order Data:");
    for (let p of formData.entries()) {
      console.log(p[0], p[1]);
    }

    // cleanup preview
    if (preview) URL.revokeObjectURL(preview);

    onConfirm(proofFile);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Order Summary</h2>

        {/* Product List */}
        <div>
          <h3 className="font-semibold mb-2">Products</h3>
          {cart.items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between text-sm mb-1"
            >
              <span>
                {item.product.title} × {item.quantity}
              </span>
              <span>₹{item.product.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <p>{checkoutData.fullName}</p>
          <p>{checkoutData.address}</p>
          <p>
            {checkoutData.city} — {checkoutData.pincode}
          </p>
        </div>

        {/* Payment */}
        <div>
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <p>{checkoutData.paymentMethod}</p>
        </div>

        {/* Price Summary */}
        <div className="border-t pt-3 text-sm space-y-1">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax (18%): ₹{tax.toFixed(2)}</p>
          <p>Discount: -₹{discount.toFixed(2)}</p>

          <p className="font-bold text-base pt-1">
            Total: ₹{total.toFixed(2)}
          </p>
        </div>

        {/* Delivery Proof Upload */}
        <div>
          <h3 className="font-semibold mb-1">Delivery Proof (Optional)</h3>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setProofFile(file);

              if (file) {
                const url = URL.createObjectURL(file);
                setPreview(url);
              } else {
                setPreview(null);
              }
            }}
            className="w-full border rounded px-3 py-2"
          />

          {/* Preview */}
          {preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>

              <img
                src={preview}
                alt="preview"
                className="w-40 h-40 object-cover rounded border"
              />

              <button
                className="mt-2 text-red-500 text-sm"
                onClick={() => {
                  setProofFile(null);
                  URL.revokeObjectURL(preview);
                  setPreview(null);
                }}
              >
                Remove Preview ✖
              </button>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Confirm Order ✓
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
