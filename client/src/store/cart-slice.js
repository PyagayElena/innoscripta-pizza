import { createSlice } from '@reduxjs/toolkit';

const defaultCart = { products: {}, total: 0 };

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: defaultCart
  },
  reducers: {
    add: (state, action) => {
      const id = action.payload.id;
      if (state.value.products[id]) {
        state.value.products[id].count++;
      } else {
        state.value.products[id] = { ...action.payload, count: 1 };
      }
      state.value.total += action.payload.price;
    },
    remove: (state, action) => {
      const id = action.payload.id;
      if (!state.value.products[id]) {
        return;
      }
      if (state.value.products[id].count > 1) {
        state.value.products[id].count--;
      } else {
        delete state.value.products[id];
      }
      state.value.total -= action.payload.price;
    },
    clear: state => {
      state.value = defaultCart;
    }
  }
});

export const { add, remove, clear } = CartSlice.actions;

export const selectorCart = state => state.cart.value;

export default CartSlice.reducer;

