import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './user-slice';
import CartReducer from './cart-slice';

export default configureStore({
  reducer: {
    user: UserReducer,
    cart: CartReducer
  },
});
