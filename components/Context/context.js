import React, {useState, useContext, useReducer, useEffect } from 'react';

import reducer from './reducers';

const AppContext = React.createContext()

// const storage = JSON.parse(window.localStorage.getItem("allEntries"));


const AppProvider = ({children}) => {
 
  const [key, setKey] = useState([])

  useEffect(() => {
    const value = localStorage.getItem("allEntries");
    const user = !!value ? JSON.parse(value) : undefined;
    setKey(user)
  }, [])

  // console.log('context storage',storage);
  const initialState = { cart: key };
console.log('context cart',initialState.cart);
  const [state, dispatch] = useReducer(reducer, initialState)
  // console.log(initialState.cart);

  const addToCart = (item) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload:{
        item,
       qty: 1
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

export  {AppContext, AppProvider}