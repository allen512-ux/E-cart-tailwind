import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cartItems',
  initialState: [],
  reducers: {
    // Add item to cart or increase quantity if already exists
    addToCart: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      } else {
        state.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
      }
    },

    // Increment product quantity
    incrementQuantity: (state, actionByCart) => {
      const existingProduct = state.find(item => item.id === actionByCart.payload);
      if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      }
    },

    // Remove product from cart
    removeCartItem: (state, actionByCart) => {
      return state.filter(item => item.id !== actionByCart.payload);
    },
    decrementQuantity: (state, actionByCart) => {
      const existingProduct = state.find(item => item.id === actionByCart.payload);
      if (existingProduct) {
        existingProduct.quantity--;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      }
    },
    emptyCart:(state)=>{
      return state=[]
    },
  }
});

export const { addToCart, incrementQuantity, removeCartItem,decrementQuantity,emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
