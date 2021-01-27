import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'Store/Slice/userSlice';

const reducer = {
  user: userReducer
};
const store = configureStore({ reducer });

export default store;
