import { createSlice } from '@reduxjs/toolkit';

const defaultCart = { products: {}, totalCount: 0, totalCost: 0 };

export const CartSlice = createSlice({
  name: 'cart',

  initialState: {
    value: defaultCart
  },

  reducers: {
    // adds 1 item of the provided product
    add: (state, action) => {
      const id = action.payload._id;

      if (state.value.products[id]) {
        state.value.products[id].count++;
      } else {
        state.value.products[id] = { ...action.payload, count: 1 };
      }

      state.value.totalCount++;
      state.value.totalCost += action.payload.price;
    },
    // removes 1 item of the provided product
    remove: (state, action) => {
      const id = action.payload._id;

      if (!state.value.products[id]) {
        return;
      }

      if (state.value.products[id].count > 1) {
        state.value.products[id].count--;
      } else {
        delete state.value.products[id];
      }

      state.value.totalCount--;
      state.value.totalCost = state.value.totalCount === 0 ? 0 : state.value.totalCost - action.payload.price;
    },
    // removes all items of the provided product
    removeAll: (state, action) => {
      const id = action.payload._id;

      if (!state.value.products[id]) {
        return;
      }

      const count = state.value.products[id].count;
      delete state.value.products[id];

      state.value.totalCount -= count;
      state.value.totalCost = state.value.totalCount === 0 ? 0 : state.value.totalCost - (action.payload.price * count);
    },
    // clears cart
    clear: state => {
      state.value = defaultCart;
    }
  }
});

export const { add, remove, removeAll, clear } = CartSlice.actions;

export const selectorCart = state => state.cart.value;

export default CartSlice.reducer;

