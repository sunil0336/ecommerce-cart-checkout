const OrderSuccess = ({ onRestart }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold text-green-600 mb-2">
        ✅ Order Placed Successfully
      </h2>
      <p className="text-gray-600 mb-4">Thank you for your purchase.</p>

      <button onClick={onRestart} className="btn-primary">
        Continue Shopping
      </button>
    </div>
  </div>
);

export default OrderSuccess;
