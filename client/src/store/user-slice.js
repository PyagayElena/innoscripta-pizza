import { createSlice } from '@reduxjs/toolkit';
import { CURRENCY } from '../constants'

const defaultUser = {
  id: '',
  currency: CURRENCY.dollar,
  email: '',
  phone: '',
  address: ''
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    value: defaultUser
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
    changeCurrency: (state, action) => {
      state.value.currency = action.payload;
    },
    signOut: state => {
      state.value = defaultUser;
    }
  }
});

export const { update, changeCurrency, signOut } = UserSlice.actions;

export const selectorUser = state => state.user.value;

export default UserSlice.reducer;