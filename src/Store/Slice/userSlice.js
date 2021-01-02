import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from 'Apis/userApi';

const initialState = {
  id: null,
  accessToken: null
};

export const fetchUserByCode = createAsyncThunk(
  'users/fetchByCode',
  async (code, thunkApi) => {
    console.log('Thunk');
    console.log(code);
    const res = await userApi.fetchByCode(code);
    const data = await res.json();
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    fetchUser(state, action) {
      console.log(action.payload);
      const { id, accessToken } = action.payload;
      state.id = id;
      state.accessToken = accessToken;
    }
  },
  extraReducers: {
    [fetchUserByCode.rejected]: (state, action) => {
      console.log(action);
    },
    [fetchUserByCode.fulfilled]: (state, action) => {
      const { id, accessToken } = action.payload;
      console.log(action.payload);

      sessionStorage.setItem('userInfo', action.payload.accessToken);
      sessionStorage.setItem('userId', action.payload.id);

      state.id = id;
      state.accessToken = accessToken;
    }
  }
});

export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
