import React, {useState, useContext, useReducer, useEffect } from 'react';

import reducer from './reducers';

const AppContext = React.createContext()

const initialState = { cart: [] };

const AppProvider = ({children}) => {

  
  const [state, dispatch] = useReducer(reducer, initialState)
  // console.log(initialState.cart);

  const addToCart = (item) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload:{
        item,
       qty: 0
      }
    
    })
  }
const removeFromCart = (id) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload:id
  })
}
  return (
  <AppContext.Provider
  value={{ ...state, addToCart, removeFromCart}}
  >
{children}
  </AppContext.Provider>)
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}
export const useStateValue = () => useContext(AppContext);

export  {AppContext, AppProvider}