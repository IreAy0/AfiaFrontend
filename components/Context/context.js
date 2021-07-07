import React, {useState, useContext, useReducer, useEffect } from 'react';

import reducer from './reducers';

const AppContext = React.createContext()

const AppProvider = ({children}) => {
 
  const [key, setKey] = useState([])

  // useEffect(() => {
  //   const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  //   setKey(storage)
  // }, [])
  // console.log('context storage',storage);
  const initialState = { cart : [] };
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