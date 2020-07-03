import { createSlice } from '@reduxjs/toolkit';
import { CURRENCY } from '../constants'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      id: '',
      currency: CURRENCY.dollar,
      email: '',
      phone: '',
      address: ''
    }
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
    changeCurrency: (state, action) => {
      state.value.currency = action.payload;
    },
  }
});

export const { update, changeCurrency } = UserSlice.actions;

export const selectorUser = state => state.user.value;

export default UserSlice.reducer;