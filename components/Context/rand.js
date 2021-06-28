
const reducer = (state , action) => {
  const { cart } = state;
  // console.log(cart);
  switch (action.type) {
    case 'ADD_TO_CART':
     const prod = action.payload
      cart.push(prod);
      console.log(`${cart} :reducer`);
      // var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
      // if(existingEntries == null) existingEntries = [];
     
      // localStorage.setItem("entry", JSON.stringify(prod));
      // // Save allEntries back to local storage
      // existingEntries.push(prod);
      // localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    
      return { ...state, cart };
      case 'REMOVE_FROM_CART':
        console.log('working');
        return {
          ...state,
          cart: cart.filter((item) => item.id !== action.payload),
        };
    default:
      return state;
  }
};

export default reducer