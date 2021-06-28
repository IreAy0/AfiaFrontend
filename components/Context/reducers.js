
const reducer = (state , action) => {
  const { cart } = state;
  console.log(cart);
  switch (action.type) {
    case 'ADD_TO_CART':
     const prod = action.payload
      cart.push(prod);
     
      var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
      if(existingEntries == null) existingEntries = [];
     
      localStorage.setItem("entry", JSON.stringify(prod));
      // Save allEntries back to local storage
      existingEntries.push(prod);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      return { ...state, cart };

      case 'REMOVE_FROM_CART':
        
        var get = JSON.parse(localStorage.getItem("allEntries"));
        var newStorage = get.filter((r) => r.item.id !== action.payload );
        localStorage.setItem('allEntries', JSON.stringify(newStorage)); 
        // location.reload()
       
        return {
          ...state,cart:newStorage,
        };
    default:
      return state;
  }
};

export default reducer