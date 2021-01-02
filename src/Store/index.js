import { configureStore } from '@reduxjs/toolkit';
import testReducer from 'Store/Slice/testSlice';
import userReducer from 'Store/Slice/userSlice';

const reducer = {
  user: userReducer,
  test: testReducer
};
const store = configureStore({ reducer });

export default store;
