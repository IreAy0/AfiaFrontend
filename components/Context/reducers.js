
const Storage = (cartItems) => {
  localStorage.setItem('allEntries', JSON.stringify(cartItems.length > 0 ? cartItems: []));
}

export const sumItems = cartItems => {
  Storage(cartItems);
  let itemCount = cartItems.reduce((total, product) => total + product.qty, 0);
  let total = cartItems.reduce((total, product) => total + product.price * product.qty, 0).toFixed(2);
  return { itemCount, total }
}

const reducer = (state , action) => {
  const { cart } = state;
  
  switch (action.type) {
    case 'ADD_TO_CART':
    //   if (!cart.find(item => item.id === action.payload.id)) {
    //   cart.push({
    //         ...action.payload,
    //         qty: 1
    //     })
    // } 
    // console.log(cart);

    // return {
    //     ...state,
    //     ...sumItems(cart),
    //     cart: [...cart]
    // }


    // cart.push(prod);
     
    //   var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    //   if(existingEntries == null) existingEntries = [];
     
    //   localStorage.setItem("entry", JSON.stringify(prod));
    //   // Save allEntries back to local storage
    //   existingEntries.push(prod);
    //   localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    //   return { ...state, cart };


      const item = action.payload.item;
      let qty = action.payload.qty
     const prod = {item, qty }
     const existing = cart.find((i) => i.item.id === item.id );
    // console.log('entries',entries);
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

     function findItem(item) {
      if (existing ) {
        
       prod.qty= existing.qty++
       const entries = JSON.parse(localStorage.getItem("allEntries"))

        entries.push({
          ...action.payload,
          qty : qty++
      })
       console.log('cart after push',cart);
       Storage(cart )
       existingEntries.push(existing);

      }
      else{
       console.log('first', cart);
       cart.push(prod)
       console.log(cart);
      if(existingEntries == null) existingEntries = [];
     
      localStorage.setItem("entry", JSON.stringify(prod));
      // Save allEntries back to local storage
      existingEntries.push(prod);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      
      }
      
     }
      findItem(prod)
      return { ...state, cart};

      case 'REMOVE_FROM_CART':
        
        var get = JSON.parse(localStorage.getItem("allEntries"));
        var newStorage = get.filter((r) => r.item.id !== action.payload );
        // localStorage.setItem('allEntries', JSON.stringify(newStorage));
        Storage(newStorage) 
        // location.reload()
       
        return {
          ...state,cart:newStorage,
        };
    default:
      return state;
  }
};

export default reducer