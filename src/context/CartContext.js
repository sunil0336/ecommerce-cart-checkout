import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { cartReducer, initialCartState } from "./cartReducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [persisted, setPersisted] = useLocalStorage(
    "cart",
    initialCartState
  );

  const [state, dispatch] = useReducer(cartReducer, persisted);

  useEffect(() => {
    setPersisted(state);
  }, [state, setPersisted]);

  const addToCart = (p) => dispatch({ type: "ADD_TO_CART", payload: p });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const applyCoupon = (code) =>
    dispatch({ type: "APPLY_COUPON", payload: code });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used in CartProvider");
  return ctx;
};
