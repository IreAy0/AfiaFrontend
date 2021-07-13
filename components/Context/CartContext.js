import React, { createContext, useReducer, useContext } from "react";
import { CartReducer, sumItems } from "./cartReducer";

export const CartContext = createContext();

let storage = [];
if (typeof window !== "undefined") {
  storage = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

const initialState = {
  cartItems: storage,
  ...sumItems(storage),
  checkout: false,
  item: [],
  layout: "grid"
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const increase = (payload) => {
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = (payload) => {
    dispatch({ type: "DECREASE", payload });
  };

  const addProduct = (payload) => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeProduct = (payload) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    console.log("CHECKOUT", state);
    dispatch({ type: "CHECKOUT" });
  };
  const changeLayoutGrid = () => {
    dispatch({ type: "CHANGE_VIEW_GRID" });
  };
  const changeLayoutList = () => {
    dispatch({ type: "CHANGE_VIEW_LIST" });
  };
  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    changeLayoutGrid,
    changeLayoutList,
    ...state
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(CartContext);
};

export default CartContextProvider;
