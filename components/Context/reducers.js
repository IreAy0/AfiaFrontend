const Storage = (cartItems) => {
  localStorage.setItem(
    "allEntries",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce((total, product) => total + product.qty, 0);
  let total = cartItems
    .reduce((total, product) => total + product.price * product.qty, 0)
    .toFixed(2);
  return { itemCount, total };
};

const reducer = (state, action) => {
  const { cart } = state;
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload.item;
      let qty = action.payload.qty;
      const prod = { item, qty };
      const existing = cart.find((i) => i.item.id === item.id);
      // console.log('entries',entries);

      function findItem(item) {
        if (existing) {
          //  prod.qty= existing.qty++
          const entries = JSON.parse(localStorage.getItem("allEntries"));

          entries.push({ ...item, qty: item.qty++ });
          console.log("exists", existing, existingEntries, entries);
          Storage(existingEntries);
          //  existingEntries.push(existing);
        } else {
          console.log("first", cart);
          cart.push(prod);
          console.log(cart);
          if (existingEntries == null) existingEntries = [];

          localStorage.setItem("entry", JSON.stringify(prod));
          // Save allEntries back to local storage
          existingEntries.push(prod);
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        }
      }
      findItem(prod);
      return { ...state, cart: existingEntries };

    case "REMOVE_FROM_CART":
      var get = JSON.parse(localStorage.getItem("allEntries"));
      var newStorage = get.filter((r) => r.item.id !== action.payload);
      // localStorage.setItem('allEntries', JSON.stringify(newStorage));
      Storage(newStorage);
      // location.reload()

      return {
        ...state,
        cart: newStorage
      };
    default:
      return state;
  }
};

export default reducer;
