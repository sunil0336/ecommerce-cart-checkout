import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";


import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import OrderSuccess from "./pages/OrderSuccess";

const AppContent = () => {
  const { clearCart } = useCart();

  const [step, setStep] = useState("products");
  const [checkoutData, setCheckoutData] = useState(null);

  // navigation controller
  const goTo = (page) => setStep(page);

  const handleCheckoutSubmit = (data) => {
    setCheckoutData(data);
    setStep("summary");
  };

  const handleConfirmOrder = (proofFile) => {
    const formData = new FormData();
    Object.entries(checkoutData).forEach(([k, v]) =>
      formData.append(k, v)
    );
    if (proofFile) formData.append("deliveryProof", proofFile);

    console.log("Order Data ->", [...formData.entries()]);

    clearCart();
    toast.success("Order placed successfully 🎉");
    setStep("success");
  };

  if (step === "products") return <Products goTo={goTo} />;
  if (step === "cart") return <Cart goTo={goTo} />;
  if (step === "checkout")
    return <Checkout onSubmit={handleCheckoutSubmit} />;

  if (step === "summary")
    return (
      <OrderSummary
        checkoutData={checkoutData}
        onConfirm={handleConfirmOrder}
      />
    );

  if (step === "success")
    return <OrderSuccess onRestart={() => setStep("products")} />;

  return null;
};

function App() {
  return (
    <CartProvider>
      <Toaster position="top-right" />
      <AppContent />
    </CartProvider>
  );
}

export default App;
