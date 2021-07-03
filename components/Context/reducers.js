
const Storage = (cartItems) => {
  localStorage.setItem('allEntries', JSON.stringify(cartItems.length > 0 ? cartItems: []));
}



const reducer = (state , action) => {
  const { cart } = state;
  
  switch (action.type) {
    
    case 'ADD_TO_CART':
      const item = action.payload.item;
      let qty = action.payload.qty
     const prod = {item, qty }
     const entries = JSON.parse(localStorage.getItem("allEntries"))
     const existing = cart.find((i) => i.item.id === item.id );
    console.log('entries',entries);
     function findItem(item) {
      if (existing ) {

       prod.qty= existing.qty++
        entries.push({
          ...action.payload,
          qty : qty++
      })
       console.log('cart after push',cart);
       Storage(cart)
      }
      else{
       console.log('first', cart);
       cart.push(prod)
       Storage(cart)
       console.log(cart);
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