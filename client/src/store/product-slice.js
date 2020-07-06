import { createSlice } from '@reduxjs/toolkit';

export const ProductSlice = createSlice({
  name: 'products',
  initialState: {
    value: []
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { update } = ProductSlice.actions;

export const selectorProduct = state => state.products.value;

export default ProductSlice.reducer;